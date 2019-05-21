import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Ionicons from 'react-icons/io'

const Container = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ background }) => background};
  box-shadow: 5px 5px 10px 2px ${({ shadowColor }) => shadowColor};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const ScrollWrapper = styled.div`
  width: 100%;
  overflow: auto;
  flex: 1;
`

const Header = styled.div`
  background: ${({ background }) => background};
  padding: 16px 8px;

  > div {
    display: flex;
    flex-direction: row;
  }
`

const Title = styled.h3`
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: 1.2em;
  margin: 0;
  flex: 5;
  text-align: center;
`

const CloseButton = styled.button`
  color: ${({ color }) => color};
  background: none;
  border: none;
  outline: none;
`

const BackButton = styled.button`
  opacity: ${({ showBack }) => showBack ? 1 : 0};
  color: ${({ color }) => color};
  background: none;
  border: none;
  outline: none;
`

const Body = styled.ul`
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ color }) => color};
  list-style: none;
  margin: 0;
  padding: 16px;
  font-size: 1em;
`

const Field = styled.li`
  padding: 8px 0;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    padding-bottom: 0;
  }
`

const Label = styled.label`
  font-weight: 600;
`

const Value = styled.div`

`

const EventLink = styled.a`
  color: ${({ color }) => color};
  display: block;
`

export default class Dialog extends Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      datetime: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })),
    closeDialog: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    DialogTitleComponent: PropTypes.func,
    DialogBodyComponent: PropTypes.func,
    theme: PropTypes.shape({
      titleFontFamily: PropTypes.string.isRequired,
      titleFontColor: PropTypes.string.isRequired,
      titleFontWeight: PropTypes.string.isRequired,
      headerBackground: PropTypes.string.isRequired,
      bodyBackground: PropTypes.string.isRequired,
      containerBackground: PropTypes.string.isRequired,
      shadowColor: PropTypes.string.isRequired,
      buttonColor: PropTypes.string.isRequired,
      bodyFontFamily: PropTypes.string.isRequired,
      bodyFontColor: PropTypes.string.isRequired,
      linkColor: PropTypes.string.isRequired,
      backButton: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
      ]).isRequired,
      closeButton: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
      ]).isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)
    this.state = { selectedEvent: -1, screenWidth: 0, screenHeight: 0 }
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.setState({ screenWidth: window.screen.availWidth, screenHeight: window.screen.availHeight })
  }

  goBack = () => {
    this.setState({ selectedEvent: -1 })
  }

  selectEvent = (index) => {
    this.setState({ selectedEvent: index })
  }

  getWidth () {
    const { width, height } = this.props
    const { screenWidth, screenHeight } = this.state
    if (width > screenWidth || height > screenHeight) return screenWidth
    return width
  }

  getHeight () {
    const { width, height } = this.props
    const { screenWidth, screenHeight } = this.state
    if (width > screenWidth || height > screenHeight) return screenHeight
    return height
  }

  renderIonicon (iconName, color) {
    const normalisedIconName = `${iconName[0].toUpperCase()}${iconName.substring(1)}`.replace(/-(.)/g, (m) => m[1].toUpperCase())
    const key = `Io${normalisedIconName}`
    const IconComponent = Ionicons[key]
    if (!IconComponent) throw new Error(`Invalid icon ${iconName}`)
    return <IconComponent color={color} size='1.5em' />
  }

  getBackButtonIcon () {
    const { theme } = this.props
    if (typeof theme.backButton === 'string') return this.renderIonicon(theme.backButton, theme.buttonColor)
    return theme.backButton
  }

  getCloseButtonIcon () {
    const { theme } = this.props
    if (typeof theme.closeButton === 'string') return this.renderIonicon(theme.closeButton, theme.buttonColor)
    return theme.closeButton
  }

  getHeader (title, showBack, DialogTitleComponent, event) {
    const { closeDialog, theme } = this.props
    return (
      <Header background={theme.headerBackground}>
        <div className='dialog-header'>
          <BackButton
            showBack={showBack}
            onClick={() => showBack && this.goBack()}
            color={theme.buttonColor}
          >
            {this.getBackButtonIcon()}
          </BackButton>
          <Title
            color={theme.titleFontColor}
            fontFamily={theme.titleFontFamily}
            fontWeight={theme.titleFontWeight}
          >
            {DialogTitleComponent &&
              <DialogTitleComponent event={event} multipleEvents={Array.isArray(event)} />
            }
            {!DialogTitleComponent && title}
          </Title>
          <CloseButton
            onClick={closeDialog}
            color={theme.buttonColor}
          >
            {this.getCloseButtonIcon()}
          </CloseButton>
        </div>
      </Header>
    )
  }

  getSelectEventHandler (index) {
    return (e) => {
      e.preventDefault()
      this.selectEvent(index)
    }
  }

  renderMultipleEvents () {
    const { events, theme, DialogTitleComponent } = this.props
    const width = this.getWidth()
    const height = this.getHeight()
    const title = `Events near ${events[0].location}`
    return (
      <Container className='dialog' width={width} height={height} background={theme.containerBackground} shadowColor={theme.shadowColor}>
        {this.getHeader(title, false, DialogTitleComponent, events)}
        <ScrollWrapper>
          <Body background={theme.bodyBackground}>
            {events.map((event, index) => (
              <Field key={event.id}>
                <EventLink href='#' onClick={this.getSelectEventHandler(index)} color={theme.linkColor}>{event.name}</EventLink>
              </Field>
            ))}
          </Body>
        </ScrollWrapper>
      </Container>
    )
  }

  renderSingleEvent (event) {
    const { theme, DialogBodyComponent, DialogTitleComponent } = this.props
    const width = this.getWidth()
    const height = this.getHeight()
    return (
      <Container className='dialog' width={width} height={height} background={theme.containerBackground} shadowColor={theme.shadowColor}>
        {this.getHeader(event.name, this.props.events.length > 1, DialogTitleComponent, event)}
        <ScrollWrapper>
          <Body className='dialog-body' fontFamily={theme.bodyFontFamily} color={theme.bodyFontColor} background={theme.bodyBackground}>
            {DialogBodyComponent &&
              <DialogBodyComponent event={event} />
            }
            {!DialogBodyComponent &&
              <Fragment>
                <Field>
                  <Label>Where?</Label>
                  <Value>{event.location}</Value>
                </Field>
                <Field>
                  <Label>When?</Label>
                  <Value>{event.datetime}</Value>
                </Field>
                <Field>
                  <Label>Event URL:</Label>
                  <EventLink href={event.url} target='_blank' color={theme.linkColor}>{event.url}</EventLink>
                </Field>
              </Fragment>
            }
          </Body>
        </ScrollWrapper>
      </Container>
    )
  }

  render () {
    const { events } = this.props
    const { selectedEvent } = this.state
    if (events.length > 1 && selectedEvent < 0) return this.renderMultipleEvents()
    const event = events.length > 1 ? events[selectedEvent] : events[0]
    return this.renderSingleEvent(event)
  }
}
