import './PageFilter.css';

import React from 'react';

import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PageFilterProps {}

interface PageFilterState {}

export default class PageFilter extends React.Component<PageFilterProps, PageFilterState> {

  public state: PageFilterState;

  constructor(props: PageFilterProps) {
    super(props);

    this.state = {};
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const match: string = event.target.value.toLowerCase();
    Array.from(document.querySelectorAll('.app-filterable')).forEach((element: Element) => {
      const node: HTMLElement = element as HTMLElement;
      const innerText: string = node.innerText.toLowerCase();
      const containsText = innerText.includes(match);
      node.style.display = containsText ? '': 'none';
    });
  }

  public render() {
    return (
      <div className="app-page-filter__container">
        <h3>Page filter</h3>
        <div className="app-page-filter">
          <input type="text" placeholder="Filter page" onChange={this.handleChange.bind(this)} />
          <FontAwesomeIcon icon={faFilter} />
        </div>
      </div>
    )
  }

}