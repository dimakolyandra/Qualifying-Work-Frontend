import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCustom extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={true} className={this.props.className}>
          <ModalBody>
            {this.props.text}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.closeModal}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalCustom;