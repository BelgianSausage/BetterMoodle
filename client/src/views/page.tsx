import React from 'react';
import Navigation from '../components/Navigation';
import PageOutline from '../components/PageOutline';

import { Schedule } from '../components/Schedule';
import Navigable from '../interfaces/navigable.interface';

interface PageProps {
  id: string;
  context?: string;
  content?: Navigable[];
  children?: React.ReactNode | React.ReactNode[];
}

export default class Page extends React.Component<PageProps> {

  render() {
    return (
      <div className="app">
        <div className="app-page">
          <Navigation currentPage={this.props.id} />
          <div className="app-page__inner">
            <div className="app-panel">
              <div className="app-panel__wrapper">
                <PageOutline context={this.props.context} content={this.props.content} />
              </div>
            </div>
            <div className="app-content">
              <div className="app-content__wrapper">
                {this.props.children}
              </div>
            </div>
            <div className="app-panel">
              <div className="app-panel__wrapper">
                <Schedule />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}