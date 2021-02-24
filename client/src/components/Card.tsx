import './Card.css';

import React from 'react';

import { Link } from 'react-router-dom';
import { IUser } from '../api/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  slug?: string;
  title: string;
  author?: IUser;
  description: string;
  className?: string;
  createdAt?: Date;
}

interface CardState { }

export default class Card extends React.Component<CardProps, CardState> {

  public render() {

    const authorLabel: JSX.Element = (
      <div className="app-icon-label">
        <span><FontAwesomeIcon icon={faUser} /></span>
        <span>{this.props.author?.firstName} {this.props.author?.lastName}</span>
      </div>
    )

    const dateLabel: JSX.Element = (
      <div className="app-icon-label">
        <span><FontAwesomeIcon icon={faClock} /></span>
        <span>{this.props.createdAt?.toLocaleDateString()}</span>
      </div>
    )

    const content: JSX.Element = (
      <div className={`app-card ${this.props.className}`}>
        <div className="app-card__title">{this.props.title}</div>
        <div className="app-card__description">{this.props.description}</div>
        <div className="app-card__footer">
          {this.props.author ? authorLabel: ""}
          {this.props.createdAt ? dateLabel: ""}
        </div>
      </div>
    )

    return this.props.slug ? <Link to={this.props.slug}>{content}</Link> : content;
  }

}