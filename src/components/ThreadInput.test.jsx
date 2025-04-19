/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle body typing correctly
 *   - should handle category typing correctly
 *   - should call create function when submit button is clicked
 */
import React from 'react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

// Karena kita menggunakan react-router-dom, kita perlu membungkus komponen yang akan kita uji dengan MemoryRouter
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    renderWithRouter(<ThreadInput onCreate={() => {}} />);
    const titleInput = await screen.getByPlaceholderText(
      'Contoh: Pendapat tentang fitur baru...'
    );

    // Action
    await userEvent.type(titleInput, 'React Redux');

    // Assert
    expect(titleInput).toHaveValue('React Redux');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    renderWithRouter(<ThreadInput onCreate={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText(
      'Tulis isi thread kamu di sini...'
    );

    // Action
    await userEvent.type(bodyInput, 'Fitur Redux sangat keren!');

    // Assert
    expect(bodyInput).toHaveValue('Fitur Redux sangat keren!');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    renderWithRouter(<ThreadInput onCreate={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Contoh: React...');

    // Action
    await userEvent.type(categoryInput, 'Teknologi');

    // Assert
    expect(categoryInput).toHaveValue('Teknologi');
  });

  it('should call create function when submit button is clicked', async () => {
    // Arrange
    const onCreate = vi.fn();
    renderWithRouter(<ThreadInput onCreate={onCreate} />);
    const titleInput = await screen.getByPlaceholderText(
      'Contoh: Pendapat tentang fitur baru...'
    );
    const categoryInput = await screen.getByPlaceholderText('Contoh: React...');
    const bodyInput = await screen.getByPlaceholderText(
      'Tulis isi thread kamu di sini...'
    );
    const submitButton = await screen.getByRole('button', {
      name: 'Buat Thread',
    });

    // Action
    await userEvent.type(titleInput, 'React Redux');
    await userEvent.type(categoryInput, 'Teknologi');
    await userEvent.type(bodyInput, 'Fitur Redux sangat keren!');
    await userEvent.click(submitButton);

    // Assert
    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});
