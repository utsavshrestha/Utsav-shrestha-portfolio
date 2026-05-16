# CLAUDE DOCUMENTATION

## SKILLS

**CLAUDE IS ALREADY BRILLIANT, A SKILL MAKE IT YOURS**

A skill is a set of instructions -packaged as a simple folder - that teaches your AI model like (claude, chatgpt etc) how to handle specific task or workflow. Skills are one of the most powerful ways to customiz claude for your specific needs. Instead of re explaning your preferences, process and domain expertise in every conversation, skills let you teach claude once and benefit everytime

Skills are powerful when you have repeatable workflows: generating frontend design from specs, conducting research with consistent methodology, creating documents that follow your team's style guide, or orchestrating multi-step process. 

A skill is  your onboarding guide for claude which is a plan language that teaches claude exactly how to handle the task - your way, your standard everytime

1. Step by step task instruction
2. Your quality criteria and format
3. Your tone, voice and style
4. Domain expertiese and context 

Using skill the claude operates exactly like a specialist trained in your method instantly, every session, for your whole team
1. Does it your way every time
2. Zero re-briefing each session
3. Consistent quality at scale
4. Share it with your entire team

> **Think of skill like writing the perfect onboarding doc for a brillient new hire. You write it once. From that moment. Claude knows your process, knows your standard and your way of doing things - perfect, every single time**

> Some production ready skill by Anthropic : <https://github.com/anthropics/skills/tree/main/skills>

Since skill is a folder it contains:
1. SKILL.md - This file is required as it contains instruction in markdown format
2. scripts - This file is optional depending on your need it may contain executable code (Python, Bash etc)
3. references - This file is optional depending on your need it contains the documentation as needed
4. assets - This folder is optional as well as it contains the templates, fonts, incons used in the output

### Why Skills ? 
1. Plain language and anyone can write it
2. Lives inside your existing workflow
3. Self improving update it any time
4. One agent can run thousand of skills 

> In Claude - Go to Customize - Skills 

### Core Design Principle
* **Progressive Disclosure**  
    1. First Level (YAML frontmatter):  
        Always loaded in Claude's system prompt. Provides just enough information for claude to know when each skill should be used without loading all of it into context.
    2. Second Level (Skill.md body):  
       Loaded when Claude thinks the skill is relevant to the current task and loads full instruction and guidance.
    3. Third Level (Linked Files):  
       This is the additional file bundle within the skill folder that the model can choose to navigate and discover when needed

    > This progressive disclosur helps to minimize the token usage while also maintaining the expertise

* **Composability**  
  The model can load multiple skill simultaneously which will work along side each other.

* **Portability**  
  It works identically across all model without modification


## Planning and Design
Before writing any code identify the uscases where you should enable the skill  
Identify:
1. What does a user want to accomplish ? 
2. What multi step workflow does this require ? 
3. Which tools are needed (built in or MCP) ?
4. What domain knowledge or best practices should be embedded ? 

Some common skill use case categories
1. Document & Assets Creation
2. Workflow Automation
3. MCP Enhancement


## Define Success Criteria
How will you know that the skill you have used is working ?  
1. Run the test quries multiple times that triggers the skills and track how many times it loads automatically vs require the explict invocation
2. Compare the same task with and without skill enabled and see how it looks
3. Note how many times you need to redirect or clarify
4. Run the same request multiple times and see the output for consistency and quality
5. Check and see if a new user can accomplish the task on the first try with minimal guidance



## Technial Requirement
### File structure
```
our-skill-name/
├── SKILL.md              # Required - main skill file
├── scripts/              # Optional - executable code
│   ├── process_data.py # Example
│   └── validate.sh # Example
├── references/           # Optional - documentation
│   ├── api-guide.md # Example
│   └── examples/ # Example
└── assets/              # Optional - templates, etc.
    └── report-template.md # Example
```

### Critical rules
SKILL.md naming:
* Must be exactly SKILL.md (case sensitive)
* No variation accepted (SKILL.MD, skill.md, etc)

Skill folder naming  
* Use kebab-case: utsav-shrestha-portfolio-setup
* No spaces: utsav shrestha portfolio setup
* No underscore: utsav_shrestha_portfolio_setup
* No capitals: UtsavShresthaProjectSetup

No README.md
* Don't include README.md inside your skill folder
* All documentation goes in SKILL.md or references/

### The most important part
This is how your model decides whether to load your skill or not so get this right

```
---
name: your-skill-name
description: What it does. Use when user asks to [specific 
phrases].
---
```
1. name: kebab-case only | No spaces or capitals | should match the folder name
2. description: Must include what skill does and when to use it(trigger condition) better to keep under 1024 character. No XML tags or (<or>) because of this malicious content could be injected. Include specific task user might say
3. License (optional): Use only if you are making the skil opensource
4. compatibility (optional): Indicates environment requirement

### Writing effective skills
According to the Anthropic's blog
```
[What it does] + [When to use it] + [Key capabilities]
```
This metadata provide enough information for claude to know when each skill should be used without loading  all of the skill into the context.

### Example of good description
```
# Good - specific and actionable
description: Analyzes Figma design files and generates 
developer handoff documentation. Use when user uploads .fig 
files, asks for "design specs", "component documentation", or 
"design-to-code handoff".

# Good - includes trigger phrases
description: Manages Linear project workflows including sprint 
planning, task creation, and status tracking. Use when user 
mentions "sprint", "Linear tasks", "project planning", or asks 
to "create tickets".

# Good - clear value proposition
description: End-to-end customer onboarding workflow for 
PayFlow. Handles account creation, payment setup, and 
subscription management. Use when user says "onboard new 
customer", "set up subscription", or "create PayFlow account".
```
### Example of bad description
```
# Too vague
description: Helps with projects.

# Missing triggers
description: Creates sophisticated multi-page documentation systems.

# Too technical, no user triggers
description: Implements the Project entity model with 
hierarchical relationships

```

### Writing the main instruction
Adapt this template for your skill. Replace bracketed section with your content
```
---
name: your-skill
description: [Describe about specific content it does]
---

# Your Skill Name-

## Instructions

### Step 1: [First Major Step]
Clear explanation of what happens
```

### Best practices for instruction
Be specific and actionable  

✅ Good
```
Run `python scripts/validate.py --input {filename}` to check 
data format.
If validation fails, common issues include:- Missing required fields (add them to the CSV)- Invalid date formats (use YYYY-MM-DD)
```
❌ Bad:
```
Validate the data before proceeding.
```
Include error handling
```
## Common Issues
### MCP Connection Failed
If you see "Connection refused":
1. Verify MCP server is running: Check Settings > Extensions
2. Confirm API key is valid
3. Try reconnecting: Settings > Extensions > [Your Service] >

```

Reference bundled resources clearly
```
Before writing queries, consult `references/api-patterns.md` 
for:  
- Rate limiting guidance
- Pagination patterns
- Error codes and handling
```

Keep SKILL.md focused on core instructions. Move detailed documentation to references/ and link it

## Testing and Iteration
Skill can be tested at varying levels depending on our need  
* Manual testing by running queries directly and observe the behavior which is fast and doesnot require and setup
* Scripted testing by automating test cases for repeatable validation across changes
* Build evalidation suites that run systematically against defined test sets

>Always iterate on singe task before expanding.

## Recommended Testing Approach
1. **Triggering Tests**  
 - Triggers on obvious tasks
 - Triggers on paraphrased requests
 - Don't trigger on un related topics

 Example test suite
 ```
 Should trigger:  
 - "Help me set up a new ProjectHub workspace"
 - "I need to create a project in ProjectHub"
 - "Initialize a ProjectHub project for Q4 planning"

Should NOT trigger:  
- "What's the weather in San Francisco?"
- "Help me write Python code"
- "Create a spreadsheet" (unless ProjectHub skill handles sheets )

```
2. **Functional Tests**  
- Valid output generated
- API calles succeed
- Error handling owrks
- Edge cases covered


```
Test: Create project with 5 tasks
Given: Project name "Q4 Planning", 5 task descriptions
When: Skill executes workflow
Then: 
  - Project created in ProjectHub
  - 5 tasks created with correct properties
  - All tasks linked to project
  - No API errors
```
3. **Performance Comparision**
- Prove the skill improve resuls vs baseline
```
Without skill:  
- User provides instructions each time  
- 15 back-and-forth messages  
- 3 failed API calls requiring retry  
- 12,000 tokens consumed  

With Skill:  
- Automatic workflow execution  
- 2 clarifying question only
- 0 failed API calls  
- 6000 token consumed
```

## Patterns and Troubleshooting
The pattern emerged from skills created by early adopter and internal teams.
They represent a common approaches that work well

### Choosing your approach
- **Problem First**: I need to setup a project workspace -> Your skill orchestrates the right MCP calls in the right sequence. User describe outcomes; the skill handles the tool  
- **Tool first**: I have Notion MCP connected -> Your skill teaches claude the optimal workflow and best practices. User have access and the skill provide the exertise

Most skill always leans in one case and knowing which usecase it fits will help to check the right pattern

### Pattern 1 : Sequential workflow execution
Use when you need multi step process in specific order

```
# Workflow: Onboard New Customer  
## Step 1: Create Account
Call MCP tool: `create_customer`
Parameters: name, email, company

## Step 2: Setup Payment
Call MCP tool: `setup_payment_method`
Wait for: payment method verification  

## Step 3: Create Subscription
Call MCP tool: `create_subscription`
Parameters: plan_id, customer_id (from Step 1)

## Step 4: Send Welcome Email
Call MCP tool: `send_email`
Template: welcome_email_template
```

### Pattern 2 : Multiple MCP coordination
Use when your workflow span multiple services
```
### Phase 1: Design Export (Figma MCP)
1. Export design assets from Figma
2. Generate design specifications
3. Create asset manifest  

### Phase 2: Asset Storage (Drive MCP)
1. Create project folder in Drive
2. Upload all assets
3. Generate shareable links

### Phase 3: Task Creation (Linear MCP)
1. Create development tasks
2. Attach asset links to tasks
3. Assign to engineering team

### Phase 4: Notification (Slack MCP)
1. Post handoff summary to #engineering
2. Include asset links and task references

```

### Pattern 3 : Iterative Refinement
Use when output quality improves with iteration

```
### Iterative Report Creation

### Initial Draft
1. Fetch data via MCP
2. Generate first draft report
3. Save to temporary file

### Quality Check
1. Run validation script: `scripts/check_report.py`
2. Identify issues:
   - Missing sections
   - Inconsistent formatting
   - Data validation errors--# Refinement Loop
1. Address each identified issue
2. Regenerate affected sections
3. Re-validate
4. Repeat until quality threshold met

### Finalization
1. Apply final formatting
2. Generate summary
3. Save final version
```

### Pattern 4 : Context Aware Tool Selection
When you need same outcome with different tool depending on context
```
# Smart File Storage  
### Decision Tree
1. Check file type and size
2. Determine best storage location:
   - Large files (>10MB): Use cloud storage MCP
   - Collaborative docs: Use Notion/Docs MCP
   - Code files: Use GitHub MCP
   - Temporary files: Use local storage--# Execute Storage
Based on decision:- Call appropriate MCP tool- Apply service-specific metadata- Generate access link

### Provide Context to User
Explain why that storage was chosen
```

### Pattern 5: Domain specific intelligence
Use this when your skill add specialized knowledge beyond tool access
```
# Payment Processing with Compliance--# Before Processing (Compliance Check)
1. Fetch transaction details via MCP
2. Apply compliance rules:
   - Check sanctions lists
   - Verify jurisdiction allowances  
   - Assess risk level
3. Document compliance decision

### Processing
IF compliance passed:
  - Call payment processing MCP tool
  - Apply appropriate fraud checks
  - Process transaction
ELSE:
  - Flag for review
  - Create compliance case
  
### Audit Trail- Log all compliance checks- Record processing decisions- Generate audit report
```

## Some common errors
### Skill won't upload
**Error: "Couldnot find SKILL.md in uploaded folder"**
**Cause**: File not named exactly SKILL.md

**Solution**  
- Rename to SKILL.md(case sensitive)
- Verify with ls -la should show SKILL.md

**Error: Invalid frontmatter ""
**Cause**: YAML formatting issue

```
# Wrong - missing delimiters
name: my-skill
description: Does things

# Wrong - unclosed quotes
name: my-skill
description: "Does things

# Correct
---
name: my-skill
description: Does thing
---
```

**Error: Invalid skill name**
**Cause: Name has space or capital**
```
# Wrong
name: Cool Skill

# Correct
name: cool-skill
```

### Skill doesn't trigger
**Skill never loads automatically**
**Fix:  Revise your description**

### Skill trigger too often
1. Add negative trigger : in description use like Do NOT use this for simple data exploration
2. Be more specific:
3. Clarify scope: 

### MCP connection issue
**Skill loads but MCP calls fails**
1. Verify MCP is connected
2. Check authentication
3. Test MCP independently
4. Verify the tool name is correct

### Instruction not followed
**Skill loads but Claude doesnot follow instruction**
1. **Instruction too verbose**:  
  - keep instruction concise
  - Use bullet point and number list
  - move detailed reference to separate file

2. **Instruction buried**
  - Put critical instruction at the top
  - Use ## important or ## critical  headers
  - Repeat key points if needed

3. Ambigious language
  ```
  # Bad: Make sure to validate things properly
  # Good :  
  CRITICAL: Before calling create_project, verify:
  - Project Name is non-empty
  - Atleast one team member is asigned
  - Start date is not in the past
  ```  

4. Add explicit encouragement
```
  - Take your time to do this thoroughly
  - Quality is more important than speed
  - Donot skip validation step
```

### Large Context Issue
**Symptoms:** Skill seems slow or responses degraded

**Causes:**  
1. Skill content too large
2. Too many skill enabled simultaneously
3. All content loaded instead of progressive disclosure


**Solution:**  
1. Optimize SKILL.md file
  - Move detailed doc to reference
  - Link to reference instead of inline
  - Keep SKILL.md under 500 lines for optimimal performance

2. Reduce enabled skill
  - Evaluate the number of skill you have enabled simultaneously
  - Recommend selective enablement
