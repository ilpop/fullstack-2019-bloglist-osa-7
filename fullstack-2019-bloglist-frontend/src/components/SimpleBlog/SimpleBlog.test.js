import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'



test('renders blog title', () => {
  const blog = {
    title: 'The Human Side of a Code Audit',
    author: 'Ruti Wajnberg',
    likes: 15
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.test-title-and-author-div')
  expect(div).toHaveTextContent('Human Side of a Code')
})


test('renders blog author', () => {
  const blog = {
    title: 'The Human Side of a Code Audit',
    author: 'Ruti Wajnberg',
    likes: 15
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.test-title-and-author-div')
  expect(div).toHaveTextContent('Ruti Wajnberg')
})


test('renders blog likes', () => {
  const blog = {
    title: 'The Human Side of a Code Audit',
    author: 'Ruti Wajnberg',
    likes: 15
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.test-likes-div')
  expect(div).toHaveTextContent(`blog has ${blog.likes} likes`)
})


test('onClick will be called twice when like button is clicked twice ', () => {
  const blog = {
    title: 'The Human Side of a Code Audit',
    author: 'Ruti Wajnberg',
    likes: 15
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
