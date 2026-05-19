'use client';

import { useState } from 'react';
import { SectionManager } from '@/components/SectionManager';
import { CopyEditor } from '@/components/CopyEditor';

export function SectionsPanel() {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  return (
    <div>
      <SectionManager
        selectedIndex={selectedSection}
        onSelect={setSelectedSection}
      />

      {selectedSection !== null && (
        <CopyEditor
          key={selectedSection}
          sectionIndex={selectedSection}
          onClose={() => setSelectedSection(null)}
        />
      )}
    </div>
  );
}
