import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'


const testUser = {
  name: 'Ellis Goof'
}

test('renders title and author', () => {

  const blog = {
    title: 'The Human Side of a Code Audit',
    author: 'Ruti Wajnberg',
    likes: 15,
  }


  const component = render(
    <Blog blog={blog}
      user={testUser}
      deleteHandler={() => {/* empty */}}
      likeHandler={() => {/* empty */}}/>
  )

  const div = component.container.querySelector('.test-short-view-div')
  expect(div).toHaveTextContent('Human Side of a Code')
  expect(div).toHaveTextContent('Ruti Wajnberg')
  const divFull = component.container.querySelector('.test-full-view-div')
  expect(divFull).toBeNull()
})



// TODO FIX: How to mock the div click?
test('all blog info is shown when div is clicked', () => {
  const blog = {
    title: 'The Human Side of a Code Audit',
    author: 'Ruti Wajnberg',
    likes: 15,
    user: testUser
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} viewTypeHandler={mockHandler} fullView={false} user={testUser}
      deleteHandler={() => {/* empty */}}
      likeHandler={() => {/* empty */}}/>
  )


  const div = component.container.querySelector('.test-short-view-clickable-div')
  fireEvent.click(div)

  expect(mockHandler.mock.calls.length).toBe(1)

  //component.debug()

  const div2 = component.container.querySelector('.test-long-view-div')
  expect(div2).toHaveTextContent('Human Side of a Code')
  expect(div2).toHaveTextContent('Ruti Wajnberg')
})