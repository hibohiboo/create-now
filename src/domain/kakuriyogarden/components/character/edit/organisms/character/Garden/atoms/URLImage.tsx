import React from 'react'
import { Image } from 'react-konva'

export default class URLImage extends React.Component<{
  src: string
  x: number
  y: number
  scale?: number
  size: number
}> {
  private image: HTMLImageElement
  private imageNode: any
  state = {
    image: null,
  }
  componentDidMount() {
    this.loadImage()
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage()
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad)
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image()
    this.image.src = this.props.src
    this.image.addEventListener('load', this.handleLoad)
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    })
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  }
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        scaleX={this.props.scale || 1}
        scaleY={this.props.scale || 1}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node
        }}
        width={this.props.size}
        height={this.props.size}
      />
    )
  }
}
