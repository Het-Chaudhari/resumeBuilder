import React, { useEffect, useState } from 'react';
import {
  BtnBold, BtnBulletList, BtnItalic, BtnLink,
  BtnNumberedList, BtnStrikeThrough, BtnUnderline,
  Editor, EditorProvider, Separator, Toolbar
} from 'react-simple-wysiwyg';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    if (defaultValue && value === '') {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <EditorProvider>
      <Editor value={value} onChange={(e) => {
        setValue(e.target.value);
        onRichTextEditorChange(e); // propagate change to parent
      }}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}

export default RichTextEditor;
