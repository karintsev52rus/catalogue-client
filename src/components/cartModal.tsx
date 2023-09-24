import Modal from 'react-bootstrap/Modal';
import {ButtonGroup, Button} from "react-bootstrap";
import { ChangeEvent, useState } from 'react';
import { ISparePart } from '../types/sparePart';
import Form from 'react-bootstrap/Form';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { cartActions } from '../store/reducers/cartReducer';
import { PartCounter } from './partCounter';
import { cartListSelector } from '../store/selectors';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useCartList } from '../hooks/useCartList';



const CartModal:React.FC<{partInfo: ISparePart}> = ({partInfo})=>{
    const {title, quantity} = partInfo
    const [show, setShow] = useState(false);
    const {getQtyInCart} = useCartList()
    const cartList = useTypedSelector(cartListSelector)
    const inCart = getQtyInCart(partInfo.partNumber, cartList)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        
        <button className = "catalogue-button  mt-2 " onClick={handleShow}> В корзину </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Укажите количество</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='mb-3'>
            {title}
            </div>
            {
              <div className="spare-part_available spare-part_prop">
              {quantity > 0 ? <span className = "spare-part_prop_value in-stock" > В наличии {quantity} шт </span> :
                  <span className = "spare-part_prop_value out-stock" > Товара нет в наличии </span>
              }
              <PartCounter partInfo={partInfo} inCart = {inCart} />
          </div>
          
            }
            
          </Modal.Body>
          <Modal.Footer>
          <button className = "catalogue-button  mt-2 " onClick={handleClose}> Отмена </button>
          <button className = "catalogue-button  mt-2 "
          onClick = {handleClose}> Ок </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export {CartModal}