import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/Card';
import RequestHandler from '../../api/RequestHandler';
import UserPreview from '../../components/UserPreview';

import { Link, Redirect, useParams } from 'react-router-dom';
import { ILesson, IModule, IUser } from '../../api/Interfaces';

interface ModuleProps {
  slug: string;
}

interface ModuleState {
  module: IModule | undefined;
  moduleRetrievalError: boolean;
}

/**
 * The module view fetches the module data from the
 * database that corresponds with its url, then renders
 * its sanitisedHTML in the body of a card.
 */
class Module extends React.Component<ModuleProps, ModuleState> {

  public state: ModuleState;

  constructor(props: ModuleProps) {
    super(props);

    this.state = {
      module: undefined,
      moduleRetrievalError: false,
    }
  }

  /**
   * When the component mounts, fetch the module data.
   */
  public componentDidMount() {
    RequestHandler.get(`/modules/${this.props.slug}`).then((response: Object) => {
      response.hasOwnProperty('error')
        ? this.setState({ moduleRetrievalError: true })
        : this.setState({ module: response as IModule });
    })
  }

  /**
   * Insert user preview cards below the body of the module. 
   * These allow users to preview the authors/teachers of the viewed module.
   */
  private getModuleAuthors() {
    if (this.state.module == null) return;
    return this.state.module.teachers.map((teacher: IUser, n: number) => {
      return <UserPreview key={n} {...teacher} />
    })
  }

  /**
   * Return a series of cards that show the lesson previews for the
   * current module.
   */
  private getLessonCards() {
    if (this.state.module == null) return;
    return this.state.module.lessons.map((lesson: ILesson, n: number) => {
      return (
        <Link to={lesson.slug} key={n}>
          <Card className="lesson">
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

  public render() {
    if (this.state.module == null) {
      return <></>
    }

    if (this.state.moduleRetrievalError) {
      return <Redirect to='/error' />
    }

    return (
      <Page id="modules" content={this.state.module.lessons}>
        <Card>
          <Card.Title>
            {this.state.module.title}
          </Card.Title>
          <Card.Body>
            <Card.Text>
              {this.state.module.description}
            </Card.Text>
          </Card.Body>
        </Card>
        {this.getLessonCards()}
        {this.getModuleAuthors()}
      </Page>
    )
  }
}

/**
 * Wrap the class component in a functional component
 * so we can use the useParams hook to access the slug,
 * then pass this in as a prop. 
 */
const ModuleView = (): JSX.Element => {
  let { slug }: any = useParams();
  return <Module slug={slug} />
}

export default ModuleView;