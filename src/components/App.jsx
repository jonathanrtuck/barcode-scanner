import { faCamera, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash-es';
import { Fab, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Quagga from 'quagga';
import React, { Component } from 'react';
import SKU from 'constants/skus';

/**
 * @class
 * @param {object} props
 */
class App extends Component {
  /**
   * @type {Ref}
   */
  root = React.createRef();

  /**
   * @type {object}
   */
  state = {
    isCapturing: false,
  };

  onBeginCapture = () => {
    this.setState(
      {
        isCapturing: true,
      },
      () => {
        Quagga.init(
          {
            decoder: {
              readers: ['upc_reader'],
            },
            inputStream: {
              name: 'Live',
              target: this.root.current,
              type: 'LiveStream',
            },
          },
          () => {
            Quagga.start();
          }
        );

        Quagga.onDetected((data) => {
          this.onEndCapture();

          /**
           * @constant
           * @type {string}
           */
          const code = get(data, 'codeResult.code');
          /**
           * @constant
           * @type {string}
           */
          const sku = SKU[code];

          if (sku) {
            window.location.href = `https://www.fls2u.com/ccrz__ProductDetails?sku=${sku}`;
          } else {
            /* eslint-disable no-console */
            console.error(`code: ${code}`, `sku: ${sku}`);
            /* eslint-enable no-console */
          }
        });
      }
    );
  };

  onEndCapture = () => {
    this.setState(
      {
        isCapturing: false,
      },
      () => {
        Quagga.stop();
      }
    );
  };

  render() {
    /**
     * @constant
     */
    const { classes } = this.props;
    /**
     * @constant
     */
    const { isCapturing } = this.state;

    /* eslint-disable jsx-a11y/media-has-caption */
    return (
      <main>
        {isCapturing && (
          <div ref={this.root}>
            <video autoPlay className={classes.video} playsInline />
          </div>
        )}
        <Fab
          className={classes.button}
          color="primary"
          onClick={isCapturing ? this.onEndCapture : this.onBeginCapture}
        >
          <FontAwesomeIcon
            className={classes.icon}
            fixedWidth
            icon={isCapturing ? faTimes : faCamera}
          />
        </Fab>
      </main>
    );
    /* eslint-enable jsx-a11y/media-has-caption */
  }
}

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

/**
 * @type {ReactElement}
 */
export default withStyles((theme) => ({
  '@global': {
    body: {
      margin: 0,
    },
  },

  button: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
  },

  icon: {
    fontSize: '1.25rem',
  },

  video: {
    display: 'block',
    margin: [[0, 'auto']],
  },
}))(App);
