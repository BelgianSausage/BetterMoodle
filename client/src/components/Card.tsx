import './Card.css';

import React from 'react';

import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  slug?: string;
  className?: string;
}

interface CardState { }

export default class Card extends React.Component<CardProps, CardState> {

  public render() {
    const content: JSX.Element = (
      <div className={`app-card ${this.props.className}`}>
        <div className="app-card__title">{this.props.title}</div>
        <div className="app-card__description">{this.props.description}</div>
      </div>
    )

    return this.props.slug ? <Link to={this.props.slug}>{content}</Link> : content;
  }

}