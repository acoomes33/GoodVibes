import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSong } from "../../redux/actions/songActions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

class EditSongForm extends Component {
  state = {
    name: "",
    genre: "",
    vibe: "",
    bpm: 0,
    lyrics: "",
  };

  componentDidMount() {
    const song = this.props.songs.find(
      (song) => song.id === parseInt(this.props.match.params.songId)
    );
    this.setState({
      name: song.name,
      genre: song.genre,
      vibe: song.vibe,
      bpm: song.bpm,
      lyrics: song.lyrics,
    });
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleOnSubmit(e) {
    e.preventDefault(e);
    this.props.updateSong(
      this.state,
      this.props.match.params.songId,
      this.props.history
    );
    this.setState({
      name: "",
      genre: "",
      vibe: "",
      bpm: 0,
      lyrics: "",
    });
  }

  render() {
    return (
      <div>
        <h1>Edit Song</h1>
        <Container>
          <Form onSubmit={(e) => this.handleOnSubmit(e)}>
            <Form.Group controlId="form.songName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => this.handleOnChange(e)}
                value={this.state.name}
              />
            </Form.Group>
            <Form.Group controlId="form.songGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                onChange={(e) => this.handleOnChange(e)}
                value={this.state.genre}
              />
            </Form.Group>
            <Form.Group controlId="form.songVibe">
              <Form.Label>Vibe</Form.Label>
              <Form.Control
                type="text"
                name="vibe"
                onChange={(e) => this.handleOnChange(e)}
                value={this.state.vibe}
              />
            </Form.Group>
            <Form.Group controlId="form.songBPM">
              <Form.Label>BPM (beats per minute)</Form.Label>
              <Form.Control
                type="number"
                name="bpm"
                onChange={(e) => this.handleOnChange(e)}
                value={this.state.bpm}
              />
            </Form.Group>
            <Form.Group controlId="form.songLyrics">
              <Form.Label>Lyrics</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="lyrics"
                onChange={(e) => this.handleOnChange(e)}
                value={this.state.lyrics}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Edit Song
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ songs }) => {
  return {
    songs: songs.all,
  };
};

export default connect(mapStateToProps, { updateSong })(EditSongForm);
