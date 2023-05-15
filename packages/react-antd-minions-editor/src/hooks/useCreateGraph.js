import { Graph } from "@antv/x6";
import { useEffect, useState } from "react";
import { config } from "./config";
import { Selection } from '@antv/x6-plugin-selection';
import { MiniMap } from "@antv/x6-plugin-minimap";
import { useToken } from "antd/es/theme/internal";
import { ActivityType } from "@rxdrag/schema";
const magnetAvailabilityHighlighter = {
    name: "stroke",
    args: {
        padding: 3,
        attrs: {
            strokeWidth: 2,
            stroke: "#52c41a",
        },
    },
};
export function useCreateGraph() {
    const [graph, setGraph] = useState();
    const [, token] = useToken();
    useEffect(() => {
        // 画布
        const gph = new Graph({
            container: document.getElementById("reactions-canvas-container"),
            ...config,
            interacting: (cellView) => {
                return { nodeMovable: true, edgeLabelMovable: false };
            },
            highlighting: {
                magnetAvailable: magnetAvailabilityHighlighter,
                magnetAdsorbed: {
                    name: 'stroke',
                    args: {
                        attrs: {
                            stroke: token.colorPrimary,
                            strokeWidth: 4,
                        },
                    },
                },
            },
            connecting: {
                //自动吸附
                snap: {
                    radius: 12,
                },
                allowBlank: false,
                allowLoop: false,
                allowNode: false,
                allowEdge: false,
                allowMulti: true,
                highlight: true,
                connector: 'reactions-connector',
                connectionPoint: 'anchor',
                anchor: 'center',
                validateMagnet(args) {
                    const { magnet, cell } = args;
                    return magnet.getAttribute('port-group') !== 'in' && cell?.getData()?.meta?.type !== ActivityType.End;
                },
                validateConnection(args) {
                    const { targetMagnet, targetCell, sourceCell, sourceMagnet } = args;
                    let isConnected = false;
                    const edges = gph?.getEdges() || [];
                    const targetId = targetCell?.id;
                    const sourceId = sourceCell?.id;
                    const targetPort = targetMagnet?.parentElement?.getAttribute('port');
                    const sourcePort = sourceMagnet?.parentElement?.getAttribute('port') || undefined;
                    for (const edge of edges) {
                        if (targetId && targetPort && edge.target.cell === targetId && edge.target.port === targetPort) {
                            isConnected = true;
                            break;
                        }
                        //连接到结束点
                        if (!targetPort && targetId) {
                            if (targetId === edge.target.cell
                                && sourceId === edge.source.cell
                                && edge.source.port === sourcePort) {
                                isConnected = true;
                                break;
                            }
                        }
                    }
                    return !isConnected &&
                        targetMagnet?.parentElement?.getAttribute('port-group') !== 'out' &&
                        targetCell?.getData()?.meta?.type !== ActivityType.Start;
                },
                createEdge() {
                    return gph?.createEdge({
                        shape: 'reaction-edge',
                        zIndex: -1,
                        attrs: {
                            line: {
                                stroke: token.colorTextSecondary,
                                strokeWidth: 1,
                                targetMarker: null,
                            },
                        },
                    });
                },
            },
        });
        gph.use(new Selection({
            enabled: true,
            multiple: false,
            rubberband: false,
            movable: true,
            //showNodeSelectionBox: true,
        }));
        gph.use(new MiniMap({
            container: document.getElementById("reactions-minimap-container"),
            width: 200,
            height: 160,
            padding: 10,
        }));
        setGraph(gph);
        return () => {
            gph?.dispose();
        };
    }, [token.colorPrimary, token.colorTextSecondary]);
    return graph;
}
