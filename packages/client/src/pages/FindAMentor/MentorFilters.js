import { FormControl, FormControlLabel, makeStyles } from "@material-ui/core";
import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import Accordion, { AccordionRow } from "../../components/Accordion";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "0 2em 0 2em"
  },
  formControl: {
    // margin: theme.spacing(3),
  },
}));

const MentorRefinementList = connectRefinementList(
  ({ items, currentRefinement, refine }) => {
    const classes = useStyles();

    return items.map((item) => {
      return (
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isRefined}
                  onChange={() => refine(item.value)}
                  name={item.label}
                />
              }
              label={item.label}
            />
          </FormControl>
        </div>
      );
    });
  }
);

const MentorFilters = () => {
  return (
    <div>
      <Accordion>
        <AccordionRow title="Tags">
          <MentorRefinementList attribute="tags" />
        </AccordionRow>
        <AccordionRow title="Languages">
          <MentorRefinementList attribute="languages_spoken" />
        </AccordionRow>
      </Accordion>
    </div>
  );
};
export default MentorFilters;
