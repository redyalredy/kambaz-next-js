"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./modulesControl";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import {
  setModules,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const courseId = cid;

  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector(
    (state: RootState) => state.modulesReducer
  );

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const canEdit =
    currentUser &&
    (currentUser.role === "FACULTY" || currentUser.role === "TA");

  const dispatch = useDispatch();

  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid, module);
    const newModules = modules.map((m: any) => m._id === module._id ? module : m);
    dispatch(setModules(newModules));
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };


  const fetchModules = async () => {
    if (!courseId) return;
    const modules = await client.findModulesForCourse(courseId);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  const onCreateModuleForCourse = async () => {
    if (!courseId || !moduleName.trim()) return;

    const newModule = {
      name: moduleName,
      course: courseId,
    };

    const createdModule = await client.createModuleForCourse(
      courseId,
      newModule
    );

    dispatch(setModules([...modules, createdModule]));
    setModuleName("");
  };

  return (
    <div className="wd-modules">
      {canEdit && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}

      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" />

                {!module.editing && module.name}

                {module.editing && canEdit && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({
                          ...module,
                          name: e.target.value,
                        })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({...module, editing: false});
                      }
                    }}
                  />
                )}
              </div>
              {canEdit && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(id) => dispatch(editModule(id))}
                />
              )}
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </div>
                    <LessonControlButtons
                      lesson={lesson}
                      canEdit={canEdit}
                    />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}