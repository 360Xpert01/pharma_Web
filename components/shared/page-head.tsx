import { Helmet } from 'react-helmet-async';

export default function PageHead({ title = 'Floor Masters' }) {

  // If title doesn't already include the business name, append it
  const fullTitle = title.includes()
    ? title
    : `${title} | ${}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
}
