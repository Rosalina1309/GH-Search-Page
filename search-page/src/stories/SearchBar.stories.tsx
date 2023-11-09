import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../components/SearchBar'

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const FirstStory: Story = {
  args: {
  },
};
export const LoadingState: Story = {
  args: {
    loading: true,
  },
};
export const ErrorState: Story = {
  args: {
    error: "User not found",
  },
};
export const UserDataState: Story = {
  args: {
    userData: {
      login: "exampleUser",
      name: "Example User",
    },
  },
};