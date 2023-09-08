
import { ButtonContainer } from './styles';

const Button = ({ label, onClick, isDisabled }) => {
  return (
    <ButtonContainer onClick={onClick} disabled={isDisabled} type="button">
      {label}
    </ButtonContainer>
  );
}

export default Button;