import { memo } from "react"
import { IFlattenedItem } from "../../interfaces/flattened"
import styled from "styled-components"
import { Draggable } from "../../dnd"
import { Button } from "antd"
import { HolderOutlined } from "@ant-design/icons"
import { floatShadow } from "../../utilities"

const Container = styled.div`
  height: 48px;
  border: solid 1px ${props => props.theme.token?.colorBorder};
  //border-radius: 8px;
  margin: 0px 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  background-color: ${props => props.theme.token?.colorBgContainer};
  flex-shrink: 0;
`

const MouseFollowerContainer = styled(Container)`
  box-shadow: ${floatShadow};
  border-radius: 8px;
  opacity: 0.8;
`

const Handler = styled(Button)`
  margin-right: 8px;
`

export const SortableItem = memo((
  props: {
    item: IFlattenedItem,
    index: number,
    indentationWidth: number,
  }
) => {
  const { item, index, indentationWidth } = props
  return (
    <Draggable
      hasHandler
      draggableId={item.meta.id}
      index={index}
    >
      {
        (provider) => {
          return <Container
            ref={provider.innerRef}
            style={{ marginLeft: indentationWidth * item.depth }}
          >
            <Handler
              ref={provider.handlerRef}
              type="text"
              icon={<HolderOutlined />}
            />
            {
              item.meta.title
            }
            ({item.meta.id})
          </Container>
        }
      }

    </Draggable>
  )
})