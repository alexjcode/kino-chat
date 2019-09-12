import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const MessageForm = ({ messageInfo, handleChange, handleSubmit, action }) => (
  <form onSubmit={handleSubmit}>
    <InputGroup className="mb-3">
      <FormControl
        placeholder="..."
        name="text"
        value={messageInfo ? messageInfo.text : ''}
        onChange={handleChange}
      />
      <InputGroup.Append>
        <Button type="submit" className="btn-light">{action}</Button>
      </InputGroup.Append>
    </InputGroup>
  </form>
)

export default MessageForm
