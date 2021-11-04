import { useTable, useFilters, useSortBy } from 'react-table';
import createEvents from './createEvents';
import { DefaultColumnFilter, SelectColumnFilter, SliderColumnFilter, NumberRangeColumnFilter } from './Filter';
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter';
import React, {useMemo} from 'react';
import './App.scss'
function App() {

  //First, let's create the the array of objects to be displayed. 
  const rowDef = [];
  for (let i = 0; i < 1000; i += 1) {
    rowDef[i] = createEvents();
    console.log('Event created is', rowDef[i])
  }
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val


  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,

      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }), []
  )

  const data = useMemo(
    () => rowDef, []
  )
  const Columns = useMemo(
    () => [

      {
        Header: 'Track ID',
        accessor: 'track-id',
        filter: 'fuzzyText',
        minWidth: 150,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes',
        minWidth: 150,
      },
      {
        Header: 'Hits',
        accessor: 'hits',
        Filter: SliderColumnFilter,
        filter: 'equals',
        minWidth: 150,
      },
      {
        Header: 'First Detect',
        accessor: 'first-detect',
        Filter: '',
        minWidth: 150,

      }, {
        Header: 'Duration',
        accessor: 'duration',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
      }, {
        Header: 'Location',
        accessor: 'location',
        Filter: '',
        minWidth: 150,
      }
    ], []
  )

  const tableInstance = useTable(
    {
      columns: Columns,
      data,
      filterTypes,
      defaultColumn
    },
    useFilters,
    useSortBy
  )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  // console.log('Rows are', Rows)

  return (
    <div class="event-list">
<section class="event-list-table bg-secondary-dark-3">
 
    <rux-table {...getTableProps()}>
    <div class="event-list-table__header-row bg-secondary-dark-3 f5  tableHeaderColor">
      <rux-table-header>

        {headerGroups.map(headerGroup => (

          <rux-table-header-row {...headerGroup.getHeaderGroupProps()}>

            {headerGroup.headers.map(column => (
             
              <th
                {...column.getHeaderProps(
                  
                  {
                  style: {
                    minWidth: 180,
                  },
                }
                )}
              >
                <rux-table-header-cell {...column.getSortByToggleProps()}>
                  <span class="addMargin">{column.render('Header')}</span>
                  <span>
                    {/* Need to find a more Astro themed up & Down bar */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
              
                <div class="addMargin">{column.canFilter ? column.render('Filter') : null}</div>
                </rux-table-header-cell>
              </th>
            
            ))}

          </rux-table-header-row>

        ))}

      </rux-table-header>
      </div>
     <div class="event-list-table__body f6 tableBody">
      <rux-table-body  {...getTableBodyProps()}>
      
          {rows.map(row => {
            //This function is responsible for lazily preparing a row for rendering. Any row that you intend to render in your table needs to be passed to this function before every render.
            prepareRow(row)

            return (
              <div class="
              event-list-table__item 
              f7 bb b--black 
              bg-tertiary
              event tableRowColor tableBody ">
              <tr {...row.getRowProps()}>
                <rux-table-row >
                  {row.cells.map(cell => {

                    return (

                      <td
                        {...cell.getCellProps({
                          style: {
                         minWidth: 180,
                        
                  },
                        })}
                      >
                        <rux-table-cell>
                          {cell.render('Cell')}
                        </rux-table-cell>

                      </td>

                    )
                  })}
                </rux-table-row>
                
              </tr>
                         </div>
          )})}

      </rux-table-body>
      </div>

    </rux-table>
    
    </section>
    </div>
  )

}
export default App;
