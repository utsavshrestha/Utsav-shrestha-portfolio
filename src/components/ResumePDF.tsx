import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Svg, Path, Polyline, Circle, Rect } from '@react-pdf/renderer';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, EXPERTISE } from '../data/content';

const MailIcon = () => (
  <Svg viewBox="0 0 24 24" width={9} height={9} style={{ position: 'relative', top: -1 }}>
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#71717a" strokeWidth="2" fill="none" />
    <Polyline points="22,6 12,13 2,6" stroke="#71717a" strokeWidth="2" fill="none" />
  </Svg>
);

const PhoneIcon = () => (
  <Svg viewBox="0 0 24 24" width={9} height={9} style={{ position: 'relative', top: -1 }}>
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#71717a" strokeWidth="2" fill="none" />
  </Svg>
);

const MapPinIcon = () => (
  <Svg viewBox="0 0 24 24" width={9} height={9} style={{ position: 'relative', top: -1 }}>
    <Path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke="#71717a" strokeWidth="2" fill="none" />
    <Circle cx="12" cy="10" r="3" stroke="#71717a" strokeWidth="2" fill="none" />
  </Svg>
);

const LinkedInIcon = () => (
  <Svg viewBox="0 0 24 24" width={9} height={9} style={{ position: 'relative', top: -1 }}>
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="#71717a" strokeWidth="2" fill="none" />
    <Rect x="2" y="9" width="4" height="12" stroke="#71717a" strokeWidth="2" fill="none" />
    <Circle cx="4" cy="4" r="2" stroke="#71717a" strokeWidth="2" fill="none" />
  </Svg>
);

const GitHubIcon = () => (
  <Svg viewBox="0 0 24 24" width={9} height={9} style={{ position: 'relative', top: -1 }}>
    <Path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" stroke="#71717a" strokeWidth="2" fill="none" />
    <Path d="M9 18c-4.51 2-5-2-7-2" stroke="#71717a" strokeWidth="2" fill="none" />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#52525b', // zinc-600
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontFamily: 'Times-Roman',
    fontSize: 32,
    color: '#18181b', // zinc-900
    marginBottom: 26,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 14,
    color: '#52525b', // zinc-600
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    color: '#71717a', // zinc-500
    fontSize: 9,
  },
  contactItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactText: {
    lineHeight: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#18181b', // zinc-900
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7', // zinc-200
    paddingBottom: 6,
  },
  summary: {
    marginBottom: 16,
    fontSize: 10,
    lineHeight: 1.6,
  },
  experienceItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    alignItems: 'baseline',
  },
  role: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: '#18181b', // zinc-900
  },
  company: {
    color: '#71717a', // zinc-500
    fontFamily: 'Helvetica',
    fontSize: 10,
    marginBottom: 4,
  },
  period: {
    color: '#a1a1aa', // zinc-400
    fontSize: 9,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 8,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: '#a1a1aa', // zinc-400
  },
  bulletText: {
    flex: 1,
    color: '#52525b', // zinc-600
  },
  educationItem: {
    marginBottom: 12,
  },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    alignItems: 'baseline',
  },
  degree: {
    fontFamily: 'Helvetica-Bold',
    color: '#18181b', // zinc-900
    fontSize: 10,
  },
  institution: {
    color: '#52525b', // zinc-600
    marginBottom: 2,
  },
  certItem: {
    marginBottom: 8,
  },
  certHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  certName: {
    fontFamily: 'Helvetica-Bold',
    color: '#18181b', // zinc-900
    fontSize: 10,
  },
  skillsGroup: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  skillsLabel: {
    fontFamily: 'Helvetica-Bold',
    color: '#18181b', // zinc-900
    width: 85,
  },
  skillsText: {
    color: '#52525b', // zinc-600
    flex: 1,
    lineHeight: 1.4,
  },
  link: {
    color: '#18181b', // zinc-900
    textDecoration: 'underline',
  }
});

export const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{PERSONAL_INFO.name}</Text>
        <Text style={styles.title} break>{PERSONAL_INFO.title}</Text>
        <View style={styles.contactRow}>
          <View style={styles.contactItemWrapper}>
            <MailIcon />
            <Text style={styles.contactText}>{PERSONAL_INFO.email}</Text>
          </View>
          <View style={styles.contactItemWrapper}>
            <PhoneIcon />
            <Text style={styles.contactText}>{PERSONAL_INFO.phone}</Text>
          </View>
          <View style={styles.contactItemWrapper}>
            <MapPinIcon />
            <Text style={styles.contactText}>{PERSONAL_INFO.location}</Text>
          </View>
          <View style={styles.contactItemWrapper}>
            <LinkedInIcon />
            <Link src={PERSONAL_INFO.linkedin} style={[styles.link, styles.contactText]}>LinkedIn</Link>
          </View>
          <View style={styles.contactItemWrapper}>
            <GitHubIcon />
            <Link src={PERSONAL_INFO.github} style={[styles.link, styles.contactText]}>GitHub</Link>
          </View>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <Text>{PERSONAL_INFO.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {EXPERIENCES.map((exp, idx) => (
          <View key={idx} style={styles.experienceItem} wrap={false}>
            <View style={styles.expHeader}>
              <Text style={styles.role}>{exp.role}</Text>
              <Text style={styles.period}>{exp.period}</Text>
            </View>
            <Text style={styles.company}>{exp.company}</Text>
            {exp.description.map((desc, i) => (
              <View key={i} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{desc}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expertise</Text>
        <View style={styles.skillsGroup}>
          <Text style={styles.skillsLabel}>Databases:</Text>
          <Text style={styles.skillsText}>{EXPERTISE.databases.join(', ')}</Text>
        </View>
        <View style={styles.skillsGroup}>
          <Text style={styles.skillsLabel}>Programming:</Text>
          <Text style={styles.skillsText}>{EXPERTISE.programming.join(', ')}</Text>
        </View>
        <View style={styles.skillsGroup}>
          <Text style={styles.skillsLabel}>Skills:</Text>
          <Text style={styles.skillsText}>{EXPERTISE.skills.join(', ')}</Text>
        </View>
      </View>

      {/* Education */}
      <View style={styles.section} break>
        <Text style={styles.sectionTitle}>Education</Text>
        {EDUCATION.map((edu, idx) => (
          <View key={idx} style={styles.educationItem}>
            <View style={styles.eduHeader}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.period}>{edu.period}</Text>
            </View>
            <Text style={styles.institution}>{edu.institution}</Text>
            {edu.details && <Text style={styles.period}>{edu.details}</Text>}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
