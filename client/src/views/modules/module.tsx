import React from 'react';
import Card from 'react-bootstrap/Card';
import Panel from '../../components/Panel';
import Navigation from '../../components/Navigation';
import UserPreview from '../../components/UserPreview';
import QuickLinks from '../../components/QuickLinks';
import PageFilter from '../../components/PageFilter';

import { Link, Redirect, useParams } from 'react-router-dom';
import { ILesson, IModule, IUser } from '../../api/Interfaces';
import RequestHandler from '../../api/RequestHandler';

interface ModuleProps {
  slug: string;
}

interface ModuleState {
  module: IModule | undefined;
  moduleRetrievalError: boolean;
}

class Module extends React.Component<ModuleProps, ModuleState> {

  public state: ModuleState;

  constructor(props: ModuleProps) {
    super(props);

    this.state = {
      module: undefined,
      moduleRetrievalError: false,
    }
  }

  public componentDidMount() {
    RequestHandler.get(`/modules/${this.props.slug}`).then((response: Object) => {
      response.hasOwnProperty('error')
        ? this.setState({ moduleRetrievalError: true })
        : this.setState({ module: response as IModule });
    })
  }

  public render() {
    const page: JSX.Element = (
      <div className="app">
        <div className="app-page">
          <Navigation currentPage="modules" />
          <div className="app-page__inner">
            <Panel>
              <PageFilter />
              <QuickLinks prefix="/lessons/" links={this.state.module?.lessons || []} />
            </Panel>
            <div className="app-content">
              <div className="app-content__wrapper">
                <Card className="app-filterable">
                  <Card.Title>{this.state.module?.title}</Card.Title>
                  <Card.Body>
                    <Card.Text>{this.state.module?.description}</Card.Text>
                  </Card.Body>
                </Card>
                {
                  this.state.module?.lessons.map((lesson: ILesson, n: number) => {
                    return (
                      <Link to={`/lessons/${lesson.slug}`}>
                        <Card className="app-filterable lesson" key={n}>
                          <Card.Title>{lesson.title}</Card.Title>
                          <Card.Body>
                            <Card.Text>{lesson.description}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <div>{lesson.author.firstName} {lesson.author.lastName}</div>
                            <div>{lesson.createdAt.toLocaleDateString()}</div>
                          </Card.Footer>
                        </Card>
                      </Link>
                    )
                  })
                }
                {
                  this.state.module?.teachers.map((teacher: IUser, n: number) => {
                    return <UserPreview className="app-filterable" key={n} {...teacher} />
                  })
                }
              </div>
            </div>
            <Panel />
          </div>
        </div>
      </div>
    )

    return this.state.moduleRetrievalError ? <Redirect to='/error' /> : page;
  }
}

const ModuleView = (): JSX.Element => {
  let { slug }: any = useParams();
  return <Module slug={slug} />
}

export default ModuleView;