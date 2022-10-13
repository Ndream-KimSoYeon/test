import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from './editor/ckeditor';

interface StoryWriteEditorProps {
  onChange: (value: string) => void;
  value: string;
}

const StoryWriteEditor = ({ onChange, value }: StoryWriteEditorProps) => {
  return (
    <CKEditor
      editor={Editor}
      data={value}
      config={{
        simpleUpload: {
          uploadUrl: 'api/upload',
          withCredentials: true
        }
      }}
      onChange={(event, editor) => {
        onChange(editor.getData());
      }}
    />
  );
};

export default StoryWriteEditor;
