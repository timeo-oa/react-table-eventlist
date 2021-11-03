import { useTable, useFilters, useSortBy } from 'react-table';
import createEvents from './createEvents';
import { DefaultColumnFilter, SelectColumnFilter, SliderColumnFilter, NumberRangeColumnFilter } from './Filter';
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter';
import { motion, AnimatePresence } from 'framer-motion';
import React, {useMemo} from 'react';

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
  const spring = useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
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

    <rux-table {...getTableProps()}>

      <rux-table-header>

        {headerGroups.map(headerGroup => (

          <rux-table-header-row {...headerGroup.getHeaderGroupProps()}>

            {headerGroup.headers.map(column => (

              <motion.th
                {...column.getHeaderProps({
                  layoutTransition: spring,
                  style: {
                    minWidth: column.minWidth,
                  },
                })}
              >
                <rux-table-header-cell {...column.getSortByToggleProps()}>
                  {column.render('Header')}
                  <span>
                    {/* Need to find a more Astro themed up & Down bar */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </rux-table-header-cell>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </motion.th>

            ))}

          </rux-table-header-row>

        ))}

      </rux-table-header>

      <rux-table-body {...getTableBodyProps()}>
        <AnimatePresence>
          {rows.map(row => {
            //This function is responsible for lazily preparing a row for rendering. Any row that you intend to render in your table needs to be passed to this function before every render.
            prepareRow(row)

            return (

              <motion.tr {...row.getRowProps({
                layoutTransition: spring,
                exit: { opacity: 0, maxHeight: 0 },
              })}>
                <rux-table-row >
                  {row.cells.map(cell => {

                    return (

                      <motion.td
                        {...cell.getCellProps({
                          layoutTransition: spring,
                          style: {
                         minWidth: 180,
                  },
                        })}
                      >
                        <rux-table-cell>
                          {cell.render('Cell')}
                        </rux-table-cell>

                      </motion.td>

                    )
                  })}
                </rux-table-row>
                
              </motion.tr>
                         
          )})}
        </AnimatePresence>

      </rux-table-body>

    </rux-table>

  )

}
export default App;
