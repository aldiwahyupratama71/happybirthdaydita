const fs = require('fs');

const SECTIONS = [
  { file: 'Opening.jsx', label: null },
  { file: 'Birthday.jsx', index: 2, label: 'Birthday' },
  { file: 'Story.jsx', index: 3, label: 'How We Started' },
  { file: 'Timeline.jsx', index: 4, label: 'Our Journey' },
  { file: 'Memories.jsx', index: 5, label: 'Memories' },
  { file: 'LittleThings.jsx', index: 6, label: 'The Little Things' },
  { file: 'Reflection.jsx', index: 7, label: 'My Reflection' },
  { file: 'Realization.jsx', index: 8, label: 'What I Realized' },
  { file: 'Growth.jsx', index: 9, label: "What I'm Changing" },
  { file: 'Feelings.jsx', index: 10, label: 'What I Still Feel' },
  { file: 'Future.jsx', index: 11, label: 'If We Ever Try Again' },
  { file: 'Choice.jsx', index: 12, label: 'My Choice' },
  { file: 'Letter.jsx', index: 13, label: 'Letter For You' },
  { file: 'Final.jsx', index: 14, label: 'Final' }
];

SECTIONS.forEach(sec => {
  if (!sec.label) return;
  const path = `f:/Myproject/happybirthdaydita/src/components/${sec.file}`;
  let content = fs.readFileSync(path, 'utf8');
  
  const padIdx = String(sec.index).padStart(2, '0');
  
  const spanCode = `
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'block',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.28em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
          }}
        >
          {'${padIdx}\\u00a0\\u00a0/\\u00a0\\u00a0${sec.label}'}
        </motion.span>
`;

  const regex = /(\s*)(<motion\.h1|<motion\.h2|<h2|<h1)/;
  if (regex.test(content)) {
    content = content.replace(regex, `$1${spanCode.trim()}$1$2`);
    fs.writeFileSync(path, content);
    console.log(`Updated ${sec.file}`);
  } else {
    console.log(`Could not find header in ${sec.file}`);
  }
});
