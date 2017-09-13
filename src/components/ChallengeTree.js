import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Treebeard } from 'react-treebeard';


const treeStyle = {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: 'white',
      margin: 0,
      padding: 0,
      textAlign: 'Left',
      color: 'blue',
      fontFamily: 'Lato, sans-serif',
      fontSize: '14px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: 'rgba(0, 100, 0, 0.1)',
        color: 'white'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 10,
        width: 10,
        arrow: {
          fill: '#939393',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: 'darkgreen'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
};

class ChallengeTree extends Component {
  constructor(props) {
    super(props);

    const { data } = props;
    const dataArr = Object.keys(data).map(subject => {
      const name = subject
        .replace(/^\d+-/, '')
        .split('-')
        .map(x => x[0].toUpperCase() + x.slice(1))
        .join(' ');

      return {
        name,
        children: data[subject]
          .sort((a, b) => a.order - b.order)
          .map(topic => ({
            name: topic.name,
            children: topic.challenges.map(challenge => ({
              name: challenge.title
            }))
          }))
      };
    });

    this.state = {
      data: dataArr
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
  }

  render() {
    return (
      <Treebeard
        animations={false}
        data={this.state.data || null}
        onToggle={this.onToggle}
        style={treeStyle}
      />
    );
  }
}

ChallengeTree.propTypes = {
  data: PropTypes.object
};

export default ChallengeTree;
