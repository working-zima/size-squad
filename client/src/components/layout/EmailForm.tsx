import { FormEvent, useRef } from 'react';
import emailjs from '@emailjs/browser';

export const EmailForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`REACT_APP_SERVICE_ID: `, process.env.REACT_APP_SERVICE_ID)
    console.log(`REACT_APP_TEMPLATE_ID: `, process.env.REACT_APP_TEMPLATE_ID)
    console.log(`REACT_APP_PUBLIC_KEY: `, process.env.REACT_APP_PUBLIC_KEY)
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID || '',
        process.env.REACT_APP_TEMPLATE_ID || '',
        form.current || '',
        process.env.REACT_APP_PUBLIC_KEY || ''
      )
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="from_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};