import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
  align-text: center;
  gap: 0.5rem;
`;

const Thumbnail = styled.img`
  border-radius: 50%;
  margin: 0.1rem;
  max-width: 20%;
  object-fit: contain;
  border: 2px solid var(--primary-color-300);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

interface OwnerDisplayProps {
  name: string;
  avatar_url: string;
}

export const OwnerDisplay = ({ name, avatar_url }: OwnerDisplayProps) => {
  return (
    <Container>
      <Thumbnail src={avatar_url} />
      {name}
    </Container>
  );
};
