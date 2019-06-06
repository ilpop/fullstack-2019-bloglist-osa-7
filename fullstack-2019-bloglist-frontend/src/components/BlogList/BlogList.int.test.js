import React from 'react'
import {
  render, waitForElement
} from 'react-testing-library'
jest.mock('../../services/blogs')
import App from '../../App'


// https://reactjs.org/docs/test-utils.html#act
//import { act } from 'react-dom/test-utils';

// common texts, labels etc.
import Texts from '../../texts/TextsAndStrings'


describe('<App />', () => {
  it('if no user logged in, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText(Texts.BUTTON_LABEL_LOGIN)
    )

    // there is login header
    expect(component.container).toHaveTextContent(
      'Kirjaudu'
    )

    // there is login button
    expect(component.container).toHaveTextContent(
      'Loggaile sisään'
    )

    // there is no logged in text
    expect(component.container).not.toHaveTextContent(
      'logged in'
    )

    // there is no add blog button
    expect(component.container).not.toHaveTextContent(
      'add blog'
    )

    // the blog list is not rendered
    const divBlogList = component.container.querySelector('.test-blog-list-div')
    expect(divBlogList).toBeNull()
  })

  it('if user is logged in, blogs are rendered', async () => {

    const testUser = {
      username: 'tester',
      token: '34222frfrfr44343',
      name: 'Patz Xeroc'
    }

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(testUser))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.test-blog-list-div')
    )

    // there is add blog button
    expect(component.container).toHaveTextContent(
      'add blog'
    )

    // Test use is logged in
    expect(component.container).toHaveTextContent(
      `${testUser.name} logged in`
    )

    // There is blog list div
    const divBlogs = component.container.querySelector('.test-blog-list-div')
    expect(divBlogs).not.toBeNull()

  })
})