import styled from 'styled-components';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
}

const Button = styled.button.attrs<ButtonProps>((props) => ({
  type: props.type ?? 'button',
}))`
  border: 1px solid ${(props) => props.theme.colors.buttonBorderColor};
  background: transparent;
  color: ${(props) => props.theme.colors.primaryBlack};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  :disabled {
    filter: grayscale(80%);
    cursor: not-allowed;
  }
`;

export default Button;
