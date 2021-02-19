import './module.css';

import Navigation from '../components/Navigation';

import { useParams } from 'react-router-dom';
import { fakeModules } from '../data/modules';
import Card from '../components/Card';
import { ILesson, IModule, IUser } from '../api/Interfaces';
import UserPreview from '../components/UserPreview';

const ModuleView = (): JSX.Element => {

  let { slug }: any = useParams();

  const moduleContent: IModule = fakeModules.find(n => n.slug === slug) || fakeModules[0];

  return (
    <div className="app">
      <div className="app-page">
        <Navigation currentPage="modules" />
        <div className="app-page__inner">
          <div className="app-panel"></div>
          <div className="app-content">
            <div className="app-content__wrapper">
              <Card {...moduleContent} />
              {moduleContent.lessons.map((lesson: ILesson, n: number) => <Card className="app-card--lesson" key={n} {...lesson} />)}
              {moduleContent.teachers.map((teacher: IUser, n:number) => <UserPreview key={n} {...teacher} />)}
            </div>
          </div>
          <div className="app-panel"></div>
        </div>
      </div>
    </div>
  )

}

export default ModuleView;