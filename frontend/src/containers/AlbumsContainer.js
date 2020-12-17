import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlbums, deleteAlbum } from "../redux/actions/albumActions";
import { Route, Switch } from "react-router-dom";
import AlbumShow from "../components/albums/AlbumShow";
import AlbumsForm from "../components/albums/AlbumsForm";
import AlbumsIndex from "../components/albums/AlbumsIndex";

class AlbumsContainer extends Component {
  componentDidMount() {
    this.props.getAlbums();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/albums/new" component={AlbumsForm} />
          <Route
            path="/albums/:albumId"
            render={(routerProps) => (
              <AlbumShow
                {...routerProps}
                albums={this.props.albums}
                deleteAlbum={this.props.deleteAlbum}
              />
            )}
          />{" "}
          <Route
            path="/albums"
            render={(routerProps) => (
              <AlbumsIndex {...routerProps} albums={this.props.albums} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ albums }) => {
  return {
    albums: albums.all,
  };
};

export default connect(mapStateToProps, { getAlbums, deleteAlbum })(
  AlbumsContainer
);
