import * as React from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom';

export default function EditListing () {
  const params = useParams();
  const navigate = useNavigate();

  const [id, setId] = React.useState('');
  if (!params.id) {
    return (
        <>
        Listing id: <input value={id} onChange={e => setId(e.target.value)} />
        <button onClick={() => {
          navigate('/edit/' + id);
        }}>Go!</button>
        </>
    );
  }

  return (
    <div>
        <h1>Edit Listing</h1>
        <div>
          edit {params.id}
          </div>
    </div>
  );
}
