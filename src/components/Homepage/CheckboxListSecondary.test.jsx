import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckboxListSecondary from './CheckboxListSecondary';

const mockUserList = [
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '098-765-4321' }
];
describe('CheckBoxList Component', () => {

    it('renders user list', () => {
        render(<CheckboxListSecondary userList={mockUserList} onCheckedUsersChange={() => { }} />);
        mockUserList.forEach(user => {
            expect(screen.getByText(`User name: ${user.name}`)).toBeInTheDocument();
            expect(screen.getByText(`Phone Number: ${user.phone}`)).toBeInTheDocument();
        });
    });

    it('toggles checkbox state', () => {
        const handleCheckedUsersChange = jest.fn();
        render(<CheckboxListSecondary userList={mockUserList} onCheckedUsersChange={handleCheckedUsersChange} />);

        const checkbox1 = screen.getByLabelText(`User name: John Doe`);
        const checkbox2 = screen.getByLabelText(`User name: Jane Smith`);

        // Initially unchecked
        expect(checkbox1).not.toBeChecked();
        expect(checkbox2).not.toBeChecked();

        // Check the first checkbox
        fireEvent.click(checkbox1);
        expect(checkbox1).toBeChecked();
        expect(handleCheckedUsersChange).toHaveBeenCalledWith([1]);

        // Check the second checkbox
        fireEvent.click(checkbox2);
        expect(checkbox2).toBeChecked();
        expect(handleCheckedUsersChange).toHaveBeenCalledWith([1, 2]);

        // Uncheck the first checkbox
        fireEvent.click(checkbox1);
        expect(checkbox1).not.toBeChecked();
        expect(handleCheckedUsersChange).toHaveBeenCalledWith([2]);
    });

    it('calls onCheckedUsersChange with correct values', () => {
        const handleCheckedUsersChange = jest.fn();
        render(<CheckboxListSecondary userList={mockUserList} onCheckedUsersChange={handleCheckedUsersChange} />);

        const checkbox1 = screen.getByLabelText(`User name: John Doe`);
        fireEvent.click(checkbox1);

        expect(handleCheckedUsersChange).toHaveBeenCalledWith([1]);

        const checkbox2 = screen.getByLabelText(`User name: Jane Smith`);
        fireEvent.click(checkbox2);

        expect(handleCheckedUsersChange).toHaveBeenCalledWith([1, 2]);
    });

})