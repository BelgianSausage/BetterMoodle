import './PageOutline.css';

import React from 'react';
import Card from 'react-bootstrap/esm/Card';

import { faFilter, faSearch, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import INavigable from '../interfaces/navigable.interface';

interface PageOutlineProps {
  content?: INavigable[];
}

interface PageOutlineState { }

export default class PageOutline extends React.Component<PageOutlineProps, PageOutlineState> {

  state: PageOutlineState = {}

  /**
   * Truncate the length of the page outline link to at most 30 characters, followed by
   * ellipsis to indicate the overflow.
   * 
   * @param str 
   * @param length 
   * @returns 
   */
  private truncate(str: string | undefined, length: number = 30) {
    if (str != null) {
      return str.length <= length ? str : str.slice(0, length) + '...';
    }
    return "";
  }

  /**
   * Map the page contents summary and create a series of links to be displayed
   * in the sidebar on the left of the page. (This makes navigation much simpler).
   * 
   * @returns 
   */
  private getPagesLinks() {
    const links: JSX.Element[] = [];
    this.props.content?.map((value: INavigable, index: number) => {
      links.push(
        <Link to={value.slug} key={index}>
          <FontAwesomeIcon icon={faHashtag} />
          <div>{this.truncate(value.title)}</div>
        </Link>
      )
    })
    return links;
  }

  /**
   * Implement a page filter, than filters cards based on the card content that
   * matches the input control's value. 
   *  
   * @param event 
   */
  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const match: string = event.target.value.toLowerCase();
    const content = document.querySelector('.app-content');
    if (content !== null) {
      Array.from(content.querySelectorAll('.card')).forEach((element: Element) => {
        const node: HTMLElement = element as HTMLElement;
        const innerText: string = node.innerText.toLowerCase();
        const containsText = innerText.includes(match);
        node.style.display = containsText ? '' : 'none';
      });
    }
  }

  public render() {
    return (
      <Card id="page-search">
        <Card.Title>
          <div className="page-search-title">
            <h4>Page Search</h4>
            <FontAwesomeIcon icon={faFilter} />
          </div>
        </Card.Title>
        <Card.Body>
          <div className="page-search-search">
            <input
              type="text"
              name="filter"
              placeholder="Search page"
              onChange={this.handleChange.bind(this)}
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </Card.Body>
        <hr />
        <Card.Body>
          <ul>
            {this.getPagesLinks()}
          </ul>
        </Card.Body>
        <hr />
        <Card.Body>
          <Card.Text>
            <Link to="">Privacy</Link> &middot; <Link to="">Terms</Link> &middot; <Link to="">Cookie Policy</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

}