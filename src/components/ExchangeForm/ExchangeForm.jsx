import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { getExchangeInfo } from '../../redux/opreations';

const reg = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

const ExchangeForm = () => {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.currency.value;
    const isValid = reg.test(value);
    if (!isValid) {
      return;
    }

    const [amount, from, , to] = value.split(' ');
    const result = {
      to,
      from,
      amount,
    };

    dispatch(getExchangeInfo(result));
    // console.log(result);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        placeholder="15 USD in UAH"
      />
    </form>
  );
};

export default ExchangeForm;
