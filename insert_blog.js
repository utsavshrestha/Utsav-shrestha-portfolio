import Database from 'better-sqlite3';

const db = new Database('database.db');

const id = 'parquet-guide';
const title = 'Apache Parquet: Complete Beginner\'s Guide';
const date = '2026-03-06';
const excerpt = 'Everything you need to know — from what a file format even is, all the way to why Parquet powers the entire modern big data ecosystem. No jargon left unexplained.';
const tags = JSON.stringify(['Big Data', 'Data Engineering', 'Apache', 'Parquet']);
const imageUrl = 'https://picsum.photos/seed/parquet/1920/1080?blur=2';

const content = `
# What Is a Parquet File?

Before we talk about Parquet specifically, let's understand what a "file format" is — because that's the foundation everything else builds on.

**First: What is a File Format?**

A file format is simply a set of rules for how data is organized and stored inside a file. Your computer can't just dump numbers and text randomly into a file — it needs structure so that any program can later open that file and understand what's inside.

You already know file formats from everyday life:
- **TEXT (.txt / .csv):** Plain text. Every byte is a human-readable character. Simple but wasteful.
- **IMAGE (.jpg / .png):** Pixel data with smart compression so images don't take gigabytes.
- **DATA (.parquet):** Tabular data — like a spreadsheet — stored in a highly optimized binary format.

**So What is Parquet Specifically?**

Apache Parquet is an open-source, columnar storage file format designed specifically for storing large amounts of tabular data (think: database tables, spreadsheets, analytics datasets) as efficiently as possible.

It was originally created by Twitter and Cloudera in 2013, donated to the Apache Software Foundation, and is now the de-facto standard for storing data in big data and cloud data platforms.

> **SIMPLE ANALOGY**
> Imagine you have a library with 1 million books. A row-based format (like CSV) is like keeping each book as one complete unit on a shelf — title, author, year, content all together. A columnar format (like Parquet) is like keeping one giant list of all titles in one room, one giant list of all authors in another room, all years in another room. Weird for browsing, but incredibly fast if you only want to know all the publication years — you just walk into that one room.

---

## 02 — STORAGE MODEL: How Parquet Stores Your Data

This is the most important section. Understanding how Parquet physically lays data on disk explains every performance benefit it has.

### Row-Based vs Columnar — The Fundamental Difference

Let's take this simple 3-row table and see how each format stores it on disk:

| ROW | NAME  | AGE | JOB      | SALARY  |
| --- | ----- | --- | -------- | ------- |
| 0   | Alice | 30  | Engineer | 90,000  |
| 1   | Bob   | 25  | Analyst  | 60,000  |
| 2   | Carol | 35  | Manager  | 110,000 |

**📁 ROW-BASED (CSV / JSON)**
Each complete record stored together on disk, one after another.
*Query AVG(salary)? Must read ALL columns including name, age, job you don't need.*

**📦 COLUMNAR (PARQUET)**
All values of each column stored together on disk.
*Query AVG(salary)? Read only the salary chunk. Name, age, job stay on disk.*

### The Anatomy of a Parquet File

A Parquet file has a very specific internal structure. Think of it like a well-organized filing cabinet, not a random pile of papers. Here's every layer, from the outside in:

\`\`\`mermaid
graph TD
    subgraph Parquet File
        M1[PAR1 Magic Number]
        
        subgraph Row Group 1
            direction TB
            C1[Column Chunk: Name]
            C2[Column Chunk: Age]
            C3[Column Chunk: Salary]
            
            C1 --> P1[Page 1]
            C1 --> P2[Page 2]
            
            C2 --> P3[Page 1]
            C2 --> P4[Page 2]
        end
        
        subgraph Row Group 2
            direction TB
            C4[Column Chunks...]
        end
        
        subgraph File Footer
            direction TB
            S[Schema]
            O[Byte Offsets]
            E[Encodings]
            ST[Statistics min/max]
        end
        
        M2[PAR1 Magic Number]
        
        M1 --> Row_Group_1
        Row_Group_1 --> Row_Group_2
        Row_Group_2 --> File_Footer
        File_Footer --> M2
    end
    
    style M1 fill:#f9f,stroke:#333,stroke-width:2px
    style M2 fill:#f9f,stroke:#333,stroke-width:2px
    style File_Footer fill:#bbf,stroke:#333,stroke-width:2px
\`\`\`

> **Why is the footer at the END?**
> When writing a Parquet file, you don't know how many row groups there will be until you've finished writing all the data. So the footer — which contains all metadata — is written last. When reading, the engine jumps to the end of the file first, reads the footer, then uses the byte offsets in the footer to jump directly to the row groups it needs.

### Row Groups — The Horizontal Split

A Parquet file doesn't store one enormous column for billions of rows. Instead, it splits rows horizontally into Row Groups. Each Row Group is an independent unit containing column chunks for all columns, for its slice of rows.

---

## 03 — ENCODING & COMPRESSION

Parquet uses two distinct techniques to reduce file size: encoding (changing how values are represented) and compression (shrinking the resulting bytes). They work together.

### Encoding Types

- **Plain Encoding:** Raw bytes, no transformation.
- **Dictionary Encoding:** Replaces repeated values with small integer IDs. Perfect for low-cardinality columns.
- **RLE (Run-Length):** Consecutive repeated values stored as count + value.
- **Delta Encoding:** Stores differences between consecutive values instead of values themselves.
- **Bit Packing:** Uses fewer bits per integer when values are small.

### Compression Codecs

| CODEC | SPEED | COMPRESSION | USE CASE |
| ----- | ----- | ----------- | -------- |
| SNAPPY | Fast | Medium | Legacy default, Spark default |
| ZSTD | Fast | High | New pipelines, best balance |
| GZIP | Slow | Very High | Cold archival storage |
| LZ4 | Fastest | Low | Real-time streaming pipelines |

---

## 04 — SCHEMA & TYPES

Unlike CSV (which is just strings), Parquet has a rich type system. Every column has an explicit type that the file format enforces — no surprises when reading.

### Nested Data — Lists, Maps, Structs

Real-world data is rarely flat. Parquet supports nested structures using the Dremel encoding (invented by Google). It uses two special arrays called definition levels and repetition levels to encode any nested structure as flat column chunks.

---

## 05 — QUERY PERFORMANCE

Why Parquet Makes Queries Blazing Fast:

1. **Column Pruning:** Read only the columns referenced in your query and skip all others.
2. **Predicate Pushdown:** Query engines use min/max statistics per column per row group to skip entire row groups before reading any actual data.
3. **Bloom Filters:** A small probabilistic data structure stored in the footer. Can definitively say "abc-123 is definitely NOT in this row group".

---

## 06 — PARTITIONING

Instead of putting all your data in one flat folder, you split files into a directory hierarchy based on column values. Query engines understand this structure and skip entire directories when filtering.

\`\`\`text
s3://my-data-lake/events/
├── year=2024/
│ ├── month=01/
│ │ ├── part-0001.parquet (128MB)
│ │ └── part-0002.parquet (128MB)
│ └── month=02/
└── year=2025/
    ├── month=01/
    └── month=02/
\`\`\`

---

## 07 — ECOSYSTEM

Parquet doesn't exist in isolation. It's the storage layer that every major big data tool plugs into.

- **Apache Spark:** Default format for DataFrames
- **DuckDB:** Read Parquet natively, no setup
- **Delta Lake / Apache Iceberg:** Table formats on Parquet
- **AWS Athena / Trino:** Serverless SQL on S3 Parquet

---

## 08 — PYTHON USAGE

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Carol'],
    'age': [30, 25, 35],
    'salary': [90000, 60000, 110000]
})

# Write with ZSTD compression (recommended)
df.to_parquet('employees.parquet', engine='pyarrow', compression='zstd', index=False)

# Read only specific columns (Column Pruning)
df = pd.read_parquet('employees.parquet', columns=['name', 'salary'])
\`\`\`

---

## 09 — BEST PRACTICES

- **File Sizing:** Target 128 MB – 1 GB per Parquet file.
- **Compression:** Use ZSTD level 3 for new pipelines.
- **Partitioning:** Partition by date + one business column. Aim for <10,000 partitions total.
- **Query Performance:** Sort data by your most-filtered column before writing. Enable bloom filters on high-cardinality ID columns.

---

## 10 — SUMMARY

Parquet stores data column-by-column (not row-by-row), records metadata statistics in a footer, and uses strict positional ordering to reconstruct records — making it the fastest and most storage-efficient format for analytical workloads at any scale.
`;

const stmt = db.prepare('INSERT OR REPLACE INTO blogs (id, title, date, excerpt, content, tags, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)');
stmt.run(id, title, date, excerpt, content, tags, imageUrl);

console.log('Blog post inserted successfully.');
