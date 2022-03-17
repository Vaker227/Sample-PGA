import 'draft-js/dist/Draft.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import '../../style/custom-quill-editor.css';

interface EditorToolbarProps {
  onClickRaw(): void;
  viewingRaw: boolean;
}

const EditorToolbar = (props: EditorToolbarProps) => {
  const { onClickRaw, viewingRaw } = props;
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button disabled={viewingRaw} className="ql-bold disabled:opacity-60"></button>
        <button disabled={viewingRaw} className="ql-italic disabled:opacity-60"></button>
      </span>
      <span className="ql-formats">
        <button disabled={viewingRaw} className="ql-list disabled:opacity-60" value={'ordered'}></button>
        <button disabled={viewingRaw} className="ql-list disabled:opacity-60" value={'bullet'}></button>
      </span>
      <span className="ql-formats">
        <button
          type="button"
          onClick={onClickRaw}
          className="grid place-content-center text-sm text-black"
          style={{ padding: 0 }}
        >
          <i className="fa-solid fa-code"></i>
        </button>
      </span>
    </div>
  );
};

interface Props {
  text: string;
  onChange(text: string): void;
  onBlur?(): void;
}

const TextEditorComponent = (props: Props) => {
  const { text, onChange, onBlur } = props;
  const rawCodeRef = useRef<HTMLTextAreaElement>(null);
  const [viewRaw, setViewRaw] = useState(false);
  const handleViewCode = () => {
    if (viewRaw) {
      setViewRaw(false);
      return;
    } else if (rawCodeRef.current) {
      rawCodeRef.current.style.height = rawCodeRef.current.scrollHeight + 'px';
    }
    setViewRaw(true);
  };

  useEffect(() => {
    if (viewRaw && rawCodeRef.current) {
      rawCodeRef.current.style.height = rawCodeRef.current.scrollHeight + 'px';
    }
  }, [viewRaw]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: {},
      },
    }),
    [],
  );
  return (
    <div className="space-y-1">
      <EditorToolbar onClickRaw={handleViewCode} viewingRaw={viewRaw} />
      {viewRaw ? (
        <textarea
          ref={rawCodeRef}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[150px] w-full border bg-transparent"
          value={text}
        ></textarea>
      ) : (
        <ReactQuill theme={'snow'} value={text} onChange={onChange} modules={modules} onBlur={onBlur} />
      )}
    </div>
  );
};

export default React.memo(TextEditorComponent);
