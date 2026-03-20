import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/content';

export const LazyPDFDownload = ({ className }: { className?: string }) => {
  const [PDFLink, setPDFLink] = useState<any>(null);
  const [ResumeDoc, setResumeDoc] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      import('@react-pdf/renderer'),
      import('./ResumePDF')
    ]).then(([pdf, resume]) => {
      if (isMounted) {
        setPDFLink(() => pdf.PDFDownloadLink);
        setResumeDoc(() => resume.ResumePDF);
      }
    });
    return () => { isMounted = false; };
  }, []);

  if (!PDFLink || !ResumeDoc) {
    return (
      <button className={className} disabled>
        <Download size={18} />
        <span>Loading PDF...</span>
      </button>
    );
  }

  return (
    <PDFLink document={<ResumeDoc />} fileName={`${PERSONAL_INFO.name.replace(' ', '_')}_Resume.pdf`}>
      {({ loading }: any) => (
        <button className={className} disabled={loading}>
          <Download size={18} />
          <span>{loading ? 'Generating PDF...' : 'Download Resume'}</span>
        </button>
      )}
    </PDFLink>
  );
};
