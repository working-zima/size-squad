import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import SizeCard from "./SizeCard";
import InfoCard from "./InfoCard";
import EditDeleteButtons from "./EditDeleteButtons";

import { ProductResponse, User } from "../../types";

import useViewModeStore from "../../hooks/useViewModeStore";
import useDeleteUserProduct from "../../hooks/useDeleteUserProduct";

const Container = styled.div`
  padding: 1rem 0.2rem;
  font-size: 1.4rem;
  line-height: 1.67;
  height: 130px;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.dividerColor};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 40px;
`;

const Brand = styled.div`
  display: flex;
  flex: 2.5;
  word-break: break-all;
  overflow: auto hidden;
  white-space: nowrap;
  scrollbar-width: none;

  h3 {
    font-weight: 500;
    margin-right: 1rem;
    color: ${(props) => props.theme.colors.PrimaryBlue};
  }
`;

const Name = styled.p`
  display: flex;
  flex: 6.5;
  text-align: left;
  word-break: break-all;
  overflow: auto hidden;
  white-space: nowrap;
  scrollbar-width: none;

  strong {
    font-weight: 500;
    color: ${(props) => props.theme.colors.primaryBlack};
  }
`;

const Author = styled.p`
  font-weight: 500;
`;

type ProductProps = {
  product: ProductResponse;
  user?: User;
};

export default function Product({ product, user }: ProductProps) {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [{ isDescriptionView }] = useViewModeStore();
  const deleteUserProductMutation = useDeleteUserProduct();

  const isMyCard = product.author?._id === user?._id;

  useEffect(() => {
    if (confirmed === true) {
      deleteUserProductMutation.mutate(product._id);
      setConfirmed(null);
    }
  }, [confirmed]);

  return (
    <Container>
      <InfoRow>
        <Brand>
          <h3>{product.brand}</h3>
        </Brand>
        <Name>
          <strong>{product.name}</strong>
        </Name>
        {isMyCard ? (
          <EditDeleteButtons
            product={product}
            confirmed={confirmed}
            setConfirmed={setConfirmed}
          />
        ) : (
          <Author>
            <Link to={`/mypage/${product.author?._id}`}>
              {product.author?.name}
            </Link>
          </Author>
        )}
      </InfoRow>
      {isDescriptionView ? (
        <SizeCard product={product} />
      ) : (
        <InfoCard product={product} />
      )}
    </Container>
  );
}
