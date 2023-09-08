
import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';


const App = () => {
  const [operation, setOperation] = useState('');
  const [allCount, setAllCount] = useState("0");
  const [decimal, setDecimal] = useState(false);

  const handleAddNumber = (num) => {

    setAllCount((prev) => {
      if (num === "." && !decimal) {
        setDecimal(true);
        return `${prev}${num}`;
      }
      if (prev === "0" || allCount === "Não é possível dividir por zero") {
        return num;
      }
      if (num !== ".") {
        return `${prev}${num}`;
      }
    });


  };

  const handleOperation = (getsinals) => {
    const signals = ["+", "-", "/", "*",];

    if (allCount === "Não é possível dividir por zero") {
      return setAllCount("0")
    }

    if (!signals.includes(allCount[allCount.length - 1])) {
      if (getsinals !== "=" && allCount !== "") {
        setAllCount((prev) => prev + getsinals);
      }

      if (operation === "=" && getsinals === "=") {
        return setOperation("=");
      }

      if (getsinals === '=') {
        setDecimal(false);
        const result = evaluate(allCount);
        return result === Infinity ? setAllCount("Não é possível dividir por zero") : setAllCount(result);
      }
      setOperation(getsinals);
    };
  }

  const keyPress = (e) => {
    const signals = ["+", "-", "/", "*"];
    const key = e.key;

    if (key === 'Enter') {
      return handleOperation("=");
    }
    if (key === "Backspace") {
      const deleteLast = allCount.slice(0, -1)
      setAllCount(deleteLast)

    }
    if (/[0-9+\-*/=]/.test(key)) {

      if (signals.includes(key)) {
        return handleOperation(key);
      }
      if (/[0-9]/.test(key)) {
        return handleAddNumber(key);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyPress);
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  },);

  return (
    <Container>
      <Content>
        <Input value={allCount} />
        <Row>
          <Button label="x" onClick={() => { handleOperation("*") }} />
          <Button label="/" onClick={() => { handleOperation("/") }} />
          <Button label="c" onClick={() => {
            setOperation("")
            setDecimal(false)
            setAllCount("0")
          }} />
          <Button label="." onClick={() => { handleAddNumber(".") }} isDisabled={decimal} />
        </Row>
        <Row>
          <Button label="7" onClick={() => { handleAddNumber("7") }} />
          <Button label="8" onClick={() => { handleAddNumber("8") }} />
          <Button label="9" onClick={() => { handleAddNumber("9") }} />
          <Button label="-" onClick={() => { handleOperation("-") }} />
        </Row>
        <Row>
          <Button label="4" onClick={() => { handleAddNumber("4") }} />
          <Button label="5" onClick={() => { handleAddNumber("5") }} />
          <Button label="6" onClick={() => { handleAddNumber("6") }} />
          <Button label="+" onClick={() => { handleOperation("+") }} />
        </Row>
        <Row>
          <Button label="1" onClick={() => { handleAddNumber("1") }} />
          <Button label="2" onClick={() => { handleAddNumber("2") }} />
          <Button label="3" onClick={() => { handleAddNumber("3") }} />
          <Button label="=" onClick={() => { handleOperation("=") }} />
        </Row>
        <Button label="0" onClick={() => { handleAddNumber("0") }} />
      </Content>
    </Container>
  );

}
export default App;
