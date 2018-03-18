import ViewController from './ViewController';
import AudioController from './AudioController';

export const EDITING = 'EDITING';
export const LOADING = 'LOADING';
export const PLAYING = 'PLAYING';
export const DOWNLOAD = 'DOWNLOAD';
export const ERROR = 'ERROR';

class ApplicationState {
  constructor() {
    this.state = {
      page: LOADING,
    };

    AudioController.loadAudio();
    this.renderState();
  }

  setState(page, props) {
    // previous state undo changes
    switch (this.state.page) {
      case LOADING:
        ViewController.unsetLoading();
        break;

      case ERROR:
        ViewController.unsetError();
        break;

      default:
        ViewController.unsetLoading();
    }

    this.state = {
      ...this.state,
      page,
      ...props,
    };
    console.log(this.state);
    this.renderState();
  }

  renderState() {
    const { opening } = this.state;

    // next state changes
    switch (this.state.page) {
      case LOADING:
        ViewController.setLoading();
        break;

      case PLAYING:
        ViewController.playOpening(opening);
        break;

      case ERROR:
        ViewController.setError();
        break;


      default:
        ViewController.unsetLoading();
    }
  }
}

export default new ApplicationState();
