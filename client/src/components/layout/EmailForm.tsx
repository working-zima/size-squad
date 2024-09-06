import { FormEvent, useRef, useState } from 'react';

import styled from 'styled-components';
import emailjs from '@emailjs/browser';

import { TextareaBox } from '../ui/textbox/TextBoxComponents';

import useFetchUserStore from '../../hooks/useFetchUserStore';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
  font-size: 1.3rem;
  margin-top: 1rem;

  & > button {
    width: 100%;
    height: 48px;
    margin-top: 1rem;
    border: 2px solid ${props => props.theme.colors.primaryWhite};
    border-radius: ${props => props.theme.sizes.borderRadius};
    color: ${props => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 800;
  }

  & > button:disabled {
    background-color: ${props => props.theme.colors.borderColor};
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const EmailForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { user: { email, name } } = useFetchUserStore()

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (form.current) {
      const formData = new FormData(form.current);
      const message = formData.get('message');

      if (!message || typeof message !== 'string' || message.trim() === '') {
        alert('문의 내용을 입력 후 메일을 보내주세요.');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID || '',
        process.env.REACT_APP_TEMPLATE_ID || '',
        form.current || '',
        process.env.REACT_APP_PUBLIC_KEY || ''
      );

      navigate(0);
    } catch (error) {
      console.log('FAILED...', error);
      alert('문의하기를 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form ref={form} onSubmit={sendEmail}>
      <input type="hidden" name="from_name" value={name} />
      <input type="hidden" name="from_email" value={email} />
      <TextareaBox
        name="message"
        placeholder='스쿼드의 어떤 지원이 필요하신가요?'
      />
      <Button
        type="submit"
        value="Send"
        disabled={isSubmitting}
      >
        <p>
          {isSubmitting ? '보내는 중...' : '문의 메일 보내기'}
        </p>
      </Button>
    </Form>
  );
};