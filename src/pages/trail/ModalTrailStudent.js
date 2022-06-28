import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  PageContainer,
  TableComponentWithPagination,
} from "../../genericComponents";
import { alertActions } from "../../store/actions/AlertActions";
import { performGetByTrailId } from "./controllers/TrailControllers";
import ModalQuestionStudent from "./ModalQuestionStudent";

class ModalTrailStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      difficulty: "",
      list: [],
      totalItems: 0,
      fixedTotalItems: 0,
      totalPages: 0,
      page: 0,
      phaseSelect: {},
      showQuestionsModal: false,
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true }, () =>
      performGetByTrailId(this.props.trailSelect.id, this.handlePhaseChange)
    );
  };

  handlePhaseChange = (data) => {
    let phase = [];
    data.phases
      .map((item) =>
        phase.push({
          id: item.id,
          question: item.questions,
        })
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    this.setState({ list: phase, loading: false, difficulty: data.difficulty });
  };

  selectPhase = (item) => {
    this.setState({ phaseSelect: item, showQuestionsModal: true });
  };

  render() {
    const { show, onHide, trailSelect } = this.props;
    const {
      loading,
      difficulty,
      totalItems,
      totalPages,
      page,
      fixedTotalItems,
      list,
      phaseSelect,
      showQuestionsModal,
    } = this.state;
    console.log(this.props)
    return (
      <Modal
        show={show}
        onHide={onHide}
        scrollable={true}
        centered
        backdrop="static"
        size="gl"
      >
        <Modal.Header closeButton>
          {`${trailSelect?.name}  ${difficulty ? " - " + difficulty : ""}`}
        </Modal.Header>
        <Modal.Body>
          <PageContainer fixedHeight className="p-3">
            <TableComponentWithPagination
              loading={loading}
              countLabel="trilha"
              countLabelSingular="trilha"
              startSorted="id"
              header={[
                { label: "#", sortProperty: "id" },
                { label: "Quantidade de questões", sortProperty: "question" },
              ]}
              onItemClick={(item) => this.selectPhase(item)}
              totalItems={totalItems}
              fixedTotalItems={fixedTotalItems}
              totalPages={totalPages}
              page={page + 1}
              list={list}
              forEach={(item) => [
                { label: item.id },
                { label: item.question.length },
              ]}
            />
          </PageContainer>
        </Modal.Body>
        {showQuestionsModal && <ModalQuestionStudent show={showQuestionsModal}
          onHide={() => this.setState({showQuestionsModal:!showQuestionsModal})}
          phaseSelect={phaseSelect}
          trailId={this.props.trailSelect.id}
          />}
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAlert: (text, alertType, alertPriority) =>
      dispatch(alertActions.addAlert(text, alertType, alertPriority)),
  };
};

export default connect(null, mapDispatchToProps)(ModalTrailStudent);
