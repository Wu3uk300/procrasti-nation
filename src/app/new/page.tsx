import styles from "./NewTaskPage.module.css";
import NewTaskSection from "@/components/NewTaskSection";
import TaskLogic from "@/components/TaskLogic";

function NewTaskPage() {
  return (
    <div className={styles.container}>
      <NewTaskSection comp1={<TaskLogic />} />
    </div>
  );
}

export default NewTaskPage;
