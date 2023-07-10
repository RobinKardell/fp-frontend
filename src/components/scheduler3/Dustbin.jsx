import { Heading } from '@chakra-ui/react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
const style = {
  //height: '12rem',
  width: '100%',
  //marginRight: '1.5rem',
  //marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}
export const Dustbin = (props) => {

  const { name } = props
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      <Heading onClick={()=>(alert("You pressed me "+name))}>{name}</Heading>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}