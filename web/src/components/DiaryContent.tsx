import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import { axiosClient } from '@/services/axiosClient';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export default function DiaryContent() {
  const { quill, quillRef } = useQuill();

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = quill?.getSemanticHTML();
    if (quill?.getText().trim().length === 0) {
      return toast.error('No Content');
    }
    const response = axiosClient.post('/dairy', {
      userId: '6867d7414f600693ac5dd50e',
      content: payload,
    });
    toast.promise(response, {
      success: 'Memories Added Successfully',
      loading: 'Processing',
      error: 'Memories Added Unsuccessfully',
    });
    const data = await response;
    console.log(data);

    // console.log(quill?.getSemanticHTML()); // undefined > Quill Object
    // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }
  };
  return (
    <form
      onSubmit={handleSumbit}
      className=''
      style={{ width: 500, height: 300 }}
    >
      <div ref={quillRef} />
      <Button type='submit' className='mt-5'>
        Submit
      </Button>
    </form>
  );
}
