import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api from '../services/api';

const PAGE_SIZE = 5;

const UserList = () => {
  const [filter, setFilter] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  /* ───────── fetch paginated users ───────── */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const params = {
          page,
          size: PAGE_SIZE,
          ...(filter && { name: filter }),
          ...(gender && { gender }),
          ...(state && { state })
        };
        const res = await api.get('/users', { params });
        setUsers(res.data.content || []);
        setPageCount(res.data.totalPages || 0);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setUsers([]);
        setPageCount(0);
      }
    };
    fetchUsers();
  }, [filter, gender, state, page]);

  const handlePageClick = (e) => setPage(e.selected);

  return (
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h2>List of Registered Users</h2>
      {/* /\  <Link to="/register" className="btn btn-light">Back to Registration</Link> */}
      </div>

      <div className="card-body">
        {/* ────── Filters ────── */}
        <div className="row mb-3">
          <div className="col-md-4">
              <label htmlFor="filter" className="form-label">Filter : </label>
            <input
          
              className="form-control"
              placeholder="Enter employee name"
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(0); }}
            />
          </div>
          <div className="col-md-3">
            <select className="form-control" value={gender}
              onChange={(e) => { setGender(e.target.value); setPage(0); }}>
              <option value="">All Genders</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-control" value={state}
              onChange={(e) => { setState(e.target.value); setPage(0); }}>
              <option value="">All States</option>
              <option value="Delhi">Delhi</option>
              <option value="UP">UP</option>
            </select>
          </div>
        </div>

        {/* ────── Table ────── */}
        {users.length ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Reg.No</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Gender</th>
                  {/* <th>DOB</th>
                  <th>Email</th>
                  <th>Contact</th> */}
                  <th>State</th>
                  {/* <th>City</th>
                  <th>Hobbies</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>

                    {/* Photo thumbnail (shows nothing if photo is null/empty) */}
                    <td style={{ width: 70 }}>
                      {u.photo ? (
                        <img
                          src={u.photo}
                          alt={u.name}
                          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '6px' }}
                        />
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>

                    <td>{u.email ? <a href={`mailto:${u.email}`}>{u.name}</a> : u.name}</td>
                    <td>{u.gender}</td>
                    {/* <td>{u.dob}</td> */}
                    {/* <td>{u.email || '—'}</td>
                    <td>{u.mobile || u.phone || '—'}</td> */}
                    <td>{u.state}</td>
                    {/* <td>{u.city}</td>
                    <td>{u.hobbies || '—'}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info">
            {filter || gender || state
              ? 'No users match your filter.'
              : 'No users registered yet.'}
          </div>
        )}

        {/* ────── Pagination ────── */}
        {pageCount > 1 && (
          <ReactPaginate
            forcePage={page}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLabel="«"
            nextLabel="»"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
