import styled from 'styled-components';

import { GENDER } from '../../constants/apiLocalizationMap';
import { User } from '../../types';
import { key } from '../../utils';
import MyProfileCard from './MyProfileCard';

const Container = styled.div`
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
`;

type MyProfileEditFormProps = {
  user: User;
};

export default function MyProfileEditForm({ user }: MyProfileEditFormProps) {
  const profileFields = [
    {
      label: 'Email',
      value: user?.email,
      isEditable: false,
      path: 'email',
    },
    {
      label: 'Name',
      value: user?.name,
      isEditable: false,
      path: 'name',
    },
    {
      label: 'Password',
      value: user?.password,
      isEditable: true,
      path: 'password',
    },
    {
      label: 'Gender',
      value: GENDER[user?.gender?.name],
      isEditable: true,
      path: 'gender',
    },
    {
      label: 'Height',
      value: `${user?.height}cm`,
      isEditable: true,
      path: 'height',
    },
    {
      label: 'Weight',
      value: `${user?.weight}kg`,
      isEditable: true,
      path: 'weight',
    },
    {
      label: 'Physical Description',
      value: '',
      isEditable: true,
      path: 'description',
    },
  ];

  return (
    <Container>
      {profileFields.map((field, index) => (
        <MyProfileCard
          key={key(field.label, index)}
          label={field.label}
          value={field.value}
          path={field.path}
          isEditable={field.isEditable}
        />
      ))}
    </Container>
  );
}
